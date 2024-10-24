import { createAsyncThunk } from "@reduxjs/toolkit";
import { type AsyncThunkConfig } from "../async-thunk-config.type";
import { SuperheroDto } from "../../types/superhero-dto.type.js";
import { SuperheroCreateUpdateDto } from "../../types/superhero-create-update-dto.type.js";
import { SuperheroShortDto } from "../../types/superhero-short-dto.type.js";

import { name as sliceName } from "./superhero.slice.js";

const addSuperhero = createAsyncThunk<
  SuperheroDto,
  SuperheroCreateUpdateDto,
  AsyncThunkConfig
>(`${sliceName}/add-superhero`, async (payload, { extra }) => {
  const { superheroService } = extra;

  return await superheroService.create(payload);
});

const getSuperheroes = createAsyncThunk<
  SuperheroShortDto[],
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-superheroes`, async (_, { extra }) => {
  const { superheroService } = extra;

  return await superheroService.getAll();
});

const getSuperheroById = createAsyncThunk<
  SuperheroDto,
  number,
  AsyncThunkConfig
>(`${sliceName}/get-superhero-by-id`, async (id, { extra }) => {
  const { superheroService } = extra;

  return await superheroService.get(id);
});

const updateSuperhero = createAsyncThunk<
  SuperheroDto,
  { id: number; data: SuperheroCreateUpdateDto },
  AsyncThunkConfig
>(`${sliceName}/update-superhero`, async (payload, { extra }) => {
  const { superheroService } = extra;
  const { id, data } = payload;

  return await superheroService.update(id, data);
});

const deleteSuperhero = createAsyncThunk<number, number, AsyncThunkConfig>(
  `${sliceName}/delete-superhero`,
  async (id, { extra }) => {
    const { superheroService } = extra;

    return await superheroService.delete(id);
  }
);

export {
  addSuperhero,
  getSuperheroes,
  getSuperheroById,
  updateSuperhero,
  deleteSuperhero
};
