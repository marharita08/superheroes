import { SuperheroModel } from "./superhero.model";
import { ImageModel } from "./image.model";
import { SuperheroEntity } from "./superhero.entity";

class SuperheroRepository {
  private superheroModel: typeof SuperheroModel;

  private imageModel: typeof ImageModel;

  constructor(
    superheroModel: typeof SuperheroModel,
    imageModel: typeof ImageModel
  ) {
    this.superheroModel = superheroModel;
    this.imageModel = imageModel;
  }

  public async create(entity: SuperheroEntity): Promise<SuperheroEntity> {
    const {
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      images
    } = entity.toNewObject();

    const superhero = await this.superheroModel.query().insert({
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase
    });
    const savedImages = [];
    if (images) {
      for (const image of images) {
        savedImages.push(
          await this.imageModel
            .query()
            .insert({ superheroId: superhero.id, link: image.link })
        );
      }
    }

    return SuperheroEntity.initialize({
      id: superhero.id,
      createdAt: superhero.createdAt,
      updatedAt: superhero.updatedAt,
      nickname: superhero.nickname,
      realName: superhero.realName,
      originDescription: superhero.originDescription,
      superpowers: superhero.superpowers,
      catchPhrase: superhero.catchPhrase,
      images: savedImages.length > 0 ? savedImages : null
    });
  }

  public async delete(id: number): Promise<boolean> {
    const rowsDeleted = await this.superheroModel.query().deleteById(id);

    return Boolean(rowsDeleted);
  }

  public async find(id: number): Promise<SuperheroEntity | null> {
    const superhero = await this.superheroModel
      .query()
      .withGraphFetched("images")
      .findById(id);

    return superhero
      ? SuperheroEntity.initialize({
          id: superhero.id,
          createdAt: superhero.createdAt,
          updatedAt: superhero.updatedAt,
          nickname: superhero.nickname,
          realName: superhero.realName,
          originDescription: superhero.originDescription,
          superpowers: superhero.superpowers,
          catchPhrase: superhero.catchPhrase,
          images:
            superhero.images && superhero.images.length > 0
              ? superhero.images
              : null
        })
      : null;
  }

  public async findAll(
    page: number,
    pageSize: number
  ): Promise<SuperheroEntity[]> {
    const offset = (page - 1) * pageSize;

    const superheros = await this.superheroModel
      .query()
      .withGraphFetched("images")
      .orderBy("id")
      .limit(pageSize)
      .offset(offset);

    return superheros.map(superhero =>
      SuperheroEntity.initialize({
        id: superhero.id,
        createdAt: superhero.createdAt,
        updatedAt: superhero.updatedAt,
        nickname: superhero.nickname,
        realName: superhero.realName,
        originDescription: superhero.originDescription,
        superpowers: superhero.superpowers,
        catchPhrase: superhero.catchPhrase,
        images:
          superhero.images && superhero.images.length > 0
            ? superhero.images
            : null
      })
    );
  }

  public async update(
    id: number,
    payload: SuperheroEntity
  ): Promise<SuperheroEntity | null> {
    const {
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      images
    } = payload.toNewObject();

    const superhero = await this.superheroModel.query().updateAndFetchById(id, {
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase
    });

    const oldImages = await this.imageModel.query().where({ superheroId: id });

    const oldImageLinks = oldImages.map(image => image.link);
    const newImageLinks = images ? images.map(image => image.link) : [];

    const imagesToAdd = newImageLinks.filter(
      link => !oldImageLinks.includes(link)
    );
    const imagesToDelete = oldImages.filter(
      oldImage => !newImageLinks.includes(oldImage.link)
    );

    if (imagesToDelete.length > 0) {
      await this.imageModel
        .query()
        .delete()
        .whereIn(
          "id",
          imagesToDelete.map(image => image.id)
        );
    }

    if (imagesToAdd.length > 0) {
      await this.imageModel.query().insert(
        imagesToAdd.map(link => ({
          superheroId: id,
          link
        }))
      );
    }

    const savedImages = await this.imageModel
      .query()
      .where({ superheroId: id });

    return superhero
      ? SuperheroEntity.initialize({
          id: superhero.id,
          createdAt: superhero.createdAt,
          updatedAt: superhero.updatedAt,
          nickname: superhero.nickname,
          realName: superhero.realName,
          originDescription: superhero.originDescription,
          superpowers: superhero.superpowers,
          catchPhrase: superhero.catchPhrase,
          images: savedImages.length > 0 ? savedImages : null
        })
      : null;
  }

  public async count(): Promise<number> {
    return await this.superheroModel.query().resultSize();
  }
}

export { SuperheroRepository };
