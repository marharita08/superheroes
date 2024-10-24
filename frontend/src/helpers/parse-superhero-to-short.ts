import { SuperheroDto } from "../types/superhero-dto.type";
import { SuperheroShortDto } from "../types/superhero-short-dto.type";

const parseSuperheroToShort = (superhero: SuperheroDto): SuperheroShortDto => {
  return {
    id: superhero.id,
    createdAt: superhero.createdAt,
    updatedAt: superhero.updatedAt,
    nickname: superhero.nickname,
    image:
      superhero.images && superhero.images.length > 0
        ? superhero.images[0]
        : null
  };
};

export { parseSuperheroToShort };
