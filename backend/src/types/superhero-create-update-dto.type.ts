import { ImageCreateDto } from "./image-create-dto.type";

type SuperheroCreateUpdateDto = {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: ImageCreateDto[] | null;
};

export { SuperheroCreateUpdateDto };
