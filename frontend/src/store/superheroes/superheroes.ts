import {
  addSuperhero,
  updateSuperhero,
  deleteSuperhero,
  getSuperheroById,
  getSuperheroes,
  getSuperheroesCount
} from "./actions";
import { actions } from "./superheroes.slice";

const allActions = {
  addSuperhero,
  updateSuperhero,
  deleteSuperhero,
  getSuperheroById,
  getSuperheroes,
  getSuperheroesCount,
  ...actions
};

export { allActions as actions };
export { reducer } from "./superheroes.slice";
