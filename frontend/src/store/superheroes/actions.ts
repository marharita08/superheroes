import { createAsyncThunk } from "@reduxjs/toolkit";

import { type AsyncThunkConfig } from "../async-thunk-config.type";
import { SuperheroDto } from "../../types/superhero-dto.type";
import { SuperheroCreateUpdateDto } from "../../types/superhero-create-update-dto.type";
import { SuperheroShortDto } from "../../types/superhero-short-dto.type";

import { name as sliceName } from "./superheroes.slice";

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
  { page: number; pageSize: number },
  AsyncThunkConfig
>(`${sliceName}/get-superheroes`, async (payload, { extra }) => {
  const { superheroService } = extra;
  const { page, pageSize } = payload;

  return await superheroService.getAll(page, pageSize);
});

const getSuperheroesCount = createAsyncThunk<
  number,
  undefined,
  AsyncThunkConfig
>(`${sliceName}/get-superheroes-count`, async (_, { extra }) => {
  const { superheroService } = extra;

  return await superheroService.count();
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
  deleteSuperhero,
  getSuperheroesCount
};
