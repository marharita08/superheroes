import { type RootState } from "./store";
import { type AppDispatch } from "./store";
import { SuperheroService } from "../services/superheros.service";

export type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra: {
    superheroService: SuperheroService;
  };
};