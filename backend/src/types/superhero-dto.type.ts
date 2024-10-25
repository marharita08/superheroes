import { ImageDto } from "./image-dto.type";

type SuperheroDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: ImageDto[] | null;
};

export { SuperheroDto };
