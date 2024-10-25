import { useCallback, useEffect } from "react";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SuperheroForm } from "../../components/superhero-form/superhero-form";
import { SuperheroCreateUpdateSchema } from "../../validation-schemas/superhero.validation-schema";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import styles from "./create-superhero.module.css";
import { AppDispatch, RootState } from "../../store/store";
import { DataStatus } from "../../enums/data-status.enum";


type SuperheroCreateUpdateDto = z.infer<typeof SuperheroCreateUpdateSchema>;

const CreateSuperhero: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const defaultValues: SuperheroCreateUpdateDto = {
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
    images: []
  };

  const { superhero, dataStatus } = useSelector((state: RootState) => ({
    superhero: state.superheroes.currentSuperhero,
    dataStatus: state.superheroes.dataStatus
  }));

  const handleFormSubmit = useCallback((data: SuperheroCreateUpdateDto): void => {
    console.log(data);
    dispatch(superheroesActions.addSuperhero(data));
  }, [dispatch]);

  useEffect(() => {
    if (superhero && dataStatus === DataStatus.FULFILLED) {
      navigate(`/superheroes/${superhero.id}`);
    }
  }, [superhero, dataStatus, navigate]);

  const isLoading = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Superhero</h1>
        {isLoading && "Loading..."}
        <SuperheroForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export { CreateSuperhero };
