import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { SuperheroForm } from "../../components/superhero-form/superhero-form";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import { AppDispatch, RootState } from "../../store/store";
import { DataStatus } from "../../enums/data-status.enum";
import { SuperheroCreateUpdateDto } from "../../types/superhero-create-update-dto.type";
import styles from "./create-superhero.module.css";

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

  const { superhero, dataStatus, addStatus } = useSelector((state: RootState) => ({
    superhero: state.superheroes.currentSuperhero,
    dataStatus: state.superheroes.dataStatus,
    addStatus: state.superheroes.createUpdateStatus
  }));

  const handleFormSubmit = useCallback((data: SuperheroCreateUpdateDto): void => {
    dispatch(superheroesActions.addSuperhero(data));
  }, [dispatch]);

  useEffect(() => {
    if (superhero && addStatus === DataStatus.FULFILLED) {
      navigate(`/superheroes/${superhero.id}`);
    }
  }, [superhero, addStatus, navigate]);

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
