import HttpService from "./http.service";
import { SuperheroDto } from "../types/superhero-dto.type";
import { SuperheroCreateUpdateDto } from "../types/superhero-create-update-dto.type";
import { SuperheroShortDto } from "../types/superhero-short-dto.type";

class SuperheroService {
  private httpService: HttpService;

  constructor(baseURL: string) {
    this.httpService = new HttpService(baseURL);
  }

  async getAll(): Promise<SuperheroShortDto[]> {
    return this.httpService.get<SuperheroShortDto[]>("/superheroes");
  }

  async get(id: number): Promise<SuperheroDto> {
    return this.httpService.get<SuperheroDto>(`/superheroes/${id}`);
  }

  async create(superheroData: SuperheroCreateUpdateDto): Promise<SuperheroDto> {
    return this.httpService.post<SuperheroDto, SuperheroCreateUpdateDto>(
      "/superheroes",
      superheroData
    );
  }

  async update(
    id: number,
    superheroData: SuperheroCreateUpdateDto
  ): Promise<SuperheroDto> {
    return this.httpService.put<SuperheroDto, SuperheroCreateUpdateDto>(
      `/superheroes/${id}`,
      superheroData
    );
  }

  async delete(id: number): Promise<number> {
    return this.httpService.delete<number>(`/superheroes/${id}`);
  }
}

const superheroService = new SuperheroService(
  process.env.REACT_APP_API_URL as string
);

export default superheroService;
export { SuperheroService };
