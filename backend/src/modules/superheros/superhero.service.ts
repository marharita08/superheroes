import { SuperheroCreateUpdateDto } from "../../types/superhero-create-update-dto.type";
import { SuperheroDto } from "../../types/superhero-dto.type";
import { SuperheroShortDto } from "../../types/superhero-short-dto.type";
import { SuperheroEntity } from "./superhero.entity";
import { SuperheroRepository } from "./superhero.repository";

class SuperheroService {
  private superheroRepository: SuperheroRepository;

  constructor(superheroRepository: SuperheroRepository) {
    this.superheroRepository = superheroRepository;
  }

  public async create(payload: SuperheroCreateUpdateDto): Promise<SuperheroDto> {
    const superhero = await this.superheroRepository.create(SuperheroEntity.initializeNew({
      nickname: payload.nickname,
      realName: payload.realName,
      originDescription: payload.originDescription,
      superpowers: payload.superpowers,
      catchPhrase: payload.catchPhrase,
      images: payload.images,
    }));

    return superhero.toObject();
  }

  public async delete(id: number): Promise<boolean> {
    return await this.superheroRepository.delete(id);
  }

  public async find(id: number): Promise<SuperheroDto | null> {
    const superhero = await this.superheroRepository.find(id);

    return superhero?.toObject() ?? null;
  }

  public async findAll(): Promise<SuperheroShortDto[]> {
    const superheros = await this.superheroRepository.findAll();

    return superheros.map((superhero) => superhero.toShortObject());
  }

  public async update(id: number, payload: SuperheroCreateUpdateDto): Promise<SuperheroDto | null> {
    const superhero = await this.superheroRepository.update(id, SuperheroEntity.initializeNew({
      nickname: payload.nickname,
      realName: payload.realName,
      originDescription: payload.originDescription,
      superpowers: payload.superpowers,
      catchPhrase: payload.catchPhrase,
      images: payload.images,
    }));

    return superhero?.toObject() ?? null;
  }

}

export { SuperheroService };
