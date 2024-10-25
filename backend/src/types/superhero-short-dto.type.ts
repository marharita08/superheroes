import { ImageDto } from "./image-dto.type";

type SuperheroShortDto = {
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  image: ImageDto | null;
};

export { SuperheroShortDto };
