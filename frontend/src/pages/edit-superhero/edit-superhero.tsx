import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { SuperheroForm } from "../../components/superhero-form/superhero-form";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import { AppDispatch, RootState } from "../../store/store";
import { DataStatus } from "../../enums/data-status.enum";
import { SuperheroCreateUpdateDto } from "../../types/superhero-create-update-dto.type";
import styles from "./edit-superhero.module.css";

const EditSuperhero: React.FC = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { superhero, dataStatus, updateStatus } = useSelector((state: RootState) => ({
    superhero: state.superheroes.currentSuperhero,
    dataStatus: state.superheroes.dataStatus,
    updateStatus: state.superheroes.createUpdateStatus
  }));

  const handleFormSubmit = useCallback((data: SuperheroCreateUpdateDto): void => {
    if (id) {
      dispatch(superheroesActions.updateSuperhero({ id: +id, data }));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (id) {
      dispatch(superheroesActions.getSuperheroById(+id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (superhero && updateStatus === DataStatus.FULFILLED) {
      navigate(`/superheroes/${superhero.id}`);
    }
  }, [superhero, updateStatus, navigate]);

  const isLoading = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Edit Superhero</h1>
        {isLoading && "Loading..."}
        {
          superhero &&
          <SuperheroForm
            defaultValues={superhero}
            onSubmit={handleFormSubmit}
          />
        }
      </div>
    </div>
  );
};

export { EditSuperhero };
