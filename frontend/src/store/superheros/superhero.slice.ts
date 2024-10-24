import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "../../enums/data-status.enum.js";
import { ValueOf } from "../../types/value-of.type.js";
import { SuperheroDto } from "../../types/superhero-dto.type.js";
import { SuperheroShortDto } from "../../types/superhero-short-dto.type.js";
import { parseSuperheroToShort } from "../../helpers/parse-superhero-to-short.js";

import {
  addSuperhero,
  deleteSuperhero,
  getSuperheroes,
  getSuperheroById,
  updateSuperhero
} from "./actions.js";

type State = {
  superheroes: SuperheroShortDto[];
  currentSuperhero: SuperheroDto | null;
  dataStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  superheroes: [],
  currentSuperhero: null,
  dataStatus: DataStatus.IDLE
};

const { actions, name, reducer } = createSlice({
  name: "superheroes",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getSuperheroes.pending, state => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSuperheroes.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.superheroes = action.payload;
    });
    builder.addCase(getSuperheroes.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(getSuperheroById.pending, state => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSuperheroById.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.currentSuperhero = action.payload;
    });
    builder.addCase(getSuperheroById.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(addSuperhero.pending, state => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(addSuperhero.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.superheroes.push(parseSuperheroToShort(action.payload));
      state.currentSuperhero = action.payload;
    });
    builder.addCase(addSuperhero.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(updateSuperhero.pending, state => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(updateSuperhero.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.superheroes = state.superheroes.map(hero => {
        return hero.id === action.payload.id
          ? parseSuperheroToShort(action.payload)
          : hero;
      });
      state.currentSuperhero = action.payload;
    });
    builder.addCase(updateSuperhero.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
    });

    builder.addCase(deleteSuperhero.pending, state => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(deleteSuperhero.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.superheroes = state.superheroes.filter(
        hero => hero.id !== action.payload
      );
      if (state.currentSuperhero?.id === action.payload) {
        state.currentSuperhero = null;
      }
    });
    builder.addCase(deleteSuperhero.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
    });
  }
});

export { actions, name, reducer };
