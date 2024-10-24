import { configureStore } from "@reduxjs/toolkit";
import { reducer as superheroReducer } from "./superheros/superhero.slice";
import superheroService from "../services/superheros.service";

const store = configureStore({
  reducer: {
    superheroes: superheroReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          superheroService
        }
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
