import HttpService from "./http.service";
import { SuperheroDto } from "../types/superhero-dto.type";
import { SuperheroCreateUpdateDto } from "../types/superhero-create-update-dto.type";
import { SuperheroShortDto } from "../types/superhero-short-dto.type";

class SuperheroService {
  private httpService: HttpService;

  constructor(baseURL: string) {
    this.httpService = new HttpService(baseURL);
  }

  async getSuperheroes(): Promise<SuperheroShortDto[]> {
    return this.httpService.get<SuperheroShortDto[]>("/superheros");
  }

  async createSuperhero(
    superheroData: SuperheroCreateUpdateDto
  ): Promise<SuperheroDto> {
    return this.httpService.post<SuperheroDto, SuperheroCreateUpdateDto>(
      "/superheros",
      superheroData
    );
  }

  async updateSuperhero(
    id: number,
    superheroData: SuperheroCreateUpdateDto
  ): Promise<SuperheroDto> {
    return this.httpService.put<SuperheroDto, SuperheroCreateUpdateDto>(
      `/superheros/${id}`,
      superheroData
    );
  }

  async deleteSuperhero(id: number): Promise<void> {
    return this.httpService.delete<void>(`/superheros/${id}`);
  }
}

export default SuperheroService;
