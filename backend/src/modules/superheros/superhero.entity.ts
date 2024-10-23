class SuperheroEntity {
  private id: null | number;

  private createdAt: string;

  private updatedAt: string;

  private nickname: string;

  private realName: string;

  private originDescription: string;

  private superpowers: string;

  private catchPhrase: string;

  private images: string[] | null;

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
    images: string[] | null;
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
    images: string[] | null;
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
    images: string[] | null;
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
    images: string[] | null;
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
    images: string[] | null;
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
      images: this.images
    };
  }

  public toShortObject(): {
    id: number;
    createdAt: string;
    updatedAt: string;
    nickname: string;
    image: string | null;
  } {
    return {
      id: this.id as number,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      nickname: this.nickname,
      image: this.images && this.images.length > 0 ? this.images[0] : null
    };
  }
}

export { SuperheroEntity };
