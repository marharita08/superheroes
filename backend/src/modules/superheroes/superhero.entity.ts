import { ImageCreateDto } from "../../types/image-create-dto.type";
import { ImageDto } from "../../types/image-dto.type";

class SuperheroEntity {
  private id: null | number;

  private createdAt: string;

  private updatedAt: string;

  private nickname: string;

  private realName: string;

  private originDescription: string;

  private superpowers: string;

  private catchPhrase: string;

  private images: ImageDto[] | ImageCreateDto[] | null;

  private constructor({
    id,
    createdAt,
    updatedAt,
    nickname,
    realName,
    originDescription,
    superpowers,
    catchPhrase,
    images
  }: {
    id: null | number;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: ImageDto[] | ImageCreateDto[] | null;
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.nickname = nickname;
    this.realName = realName;
    this.originDescription = originDescription;
    this.superpowers = superpowers;
    this.catchPhrase = catchPhrase;
    this.images = images;
  }

  public static initialize({
    id,
    createdAt,
    updatedAt,
    nickname,
    realName,
    originDescription,
    superpowers,
    catchPhrase,
    images
  }: {
    id: null | number;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: ImageDto[] | null;
  }) {
    return new SuperheroEntity({
      id,
      createdAt,
      updatedAt,
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      images
    });
  }

  public static initializeNew({
    nickname,
    realName,
    originDescription,
    superpowers,
    catchPhrase,
    images
  }: {
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: ImageCreateDto[] | null;
  }) {
    return new SuperheroEntity({
      id: null,
      createdAt: "",
      updatedAt: "",
      nickname,
      realName,
      originDescription,
      superpowers,
      catchPhrase,
      images: images
    });
  }

  public toNewObject(): {
    createdAt: string;
    updatedAt: string;
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: ImageCreateDto[] | null;
  } {
    return {
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nickname: this.nickname,
      realName: this.realName,
      originDescription: this.originDescription,
      superpowers: this.superpowers,
      catchPhrase: this.catchPhrase,
      images: this.images
    };
  }

  public toObject(): {
    id: number;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    realName: string;
    originDescription: string;
    superpowers: string;
    catchPhrase: string;
    images: ImageDto[] | null;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nickname: this.nickname,
      realName: this.realName,
      originDescription: this.originDescription,
      superpowers: this.superpowers,
      catchPhrase: this.catchPhrase,
      images: this.images as ImageDto[]
    };
  }

  public toShortObject(): {
    id: number;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    image: ImageDto | null;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nickname: this.nickname,
      image:
        this.images && this.images.length > 0
          ? (this.images[0] as ImageDto)
          : null
    };
  }
}

export { SuperheroEntity };
