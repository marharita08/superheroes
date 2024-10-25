import { createSlice } from "@reduxjs/toolkit";

import { DataStatus } from "../../enums/data-status.enum";
import { ValueOf } from "../../types/value-of.type";
import { SuperheroDto } from "../../types/superhero-dto.type";
import { SuperheroShortDto } from "../../types/superhero-short-dto.type";
import { parseSuperheroToShort } from "../../helpers/parse-superhero-to-short";

import {
  addSuperhero,
  deleteSuperhero,
  getSuperheroes,
  getSuperheroById,
  updateSuperhero,
  getSuperheroesCount
} from "./actions";

type State = {
  superheroes: SuperheroShortDto[];
  currentSuperhero: SuperheroDto | null;
  totalCount: number;
  dataStatus: ValueOf<typeof DataStatus>;
  createUpdateStatus: ValueOf<typeof DataStatus>;
};

const initialState: State = {
  superheroes: [],
  currentSuperhero: null,
  totalCount: 0,
  dataStatus: DataStatus.IDLE,
  createUpdateStatus: DataStatus.IDLE
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
      state.createUpdateStatus = DataStatus.PENDING;
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(addSuperhero.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.createUpdateStatus = DataStatus.FULFILLED;
      state.superheroes.push(parseSuperheroToShort(action.payload));
      state.currentSuperhero = action.payload;
    });
    builder.addCase(addSuperhero.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
      state.createUpdateStatus = DataStatus.REJECTED;
    });

    builder.addCase(updateSuperhero.pending, state => {
      state.createUpdateStatus = DataStatus.PENDING;
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(updateSuperhero.fulfilled, (state, action) => {
      state.createUpdateStatus = DataStatus.FULFILLED;
      state.dataStatus = DataStatus.FULFILLED;
      state.superheroes = state.superheroes.map(hero => {
        return hero.id === action.payload.id
          ? parseSuperheroToShort(action.payload)
          : hero;
      });
      state.currentSuperhero = action.payload;
    });
    builder.addCase(updateSuperhero.rejected, state => {
      state.createUpdateStatus = DataStatus.REJECTED;
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

    builder.addCase(getSuperheroesCount.pending, state => {
      state.dataStatus = DataStatus.PENDING;
    });
    builder.addCase(getSuperheroesCount.fulfilled, (state, action) => {
      state.dataStatus = DataStatus.FULFILLED;
      state.totalCount = action.payload;
    });
    builder.addCase(getSuperheroesCount.rejected, state => {
      state.dataStatus = DataStatus.REJECTED;
    });
  }
});

export { actions, name, reducer };
