import {
  addSuperhero,
  updateSuperhero,
  deleteSuperhero,
  getSuperheroById,
  getSuperheroes
} from "./actions";
import { actions } from "./superheroes.slice";

const allActions = {
  addSuperhero,
  updateSuperhero,
  deleteSuperhero,
  getSuperheroById,
  getSuperheroes,
  ...actions
};

export { allActions as actions };
export { reducer } from "./superheroes.slice";
