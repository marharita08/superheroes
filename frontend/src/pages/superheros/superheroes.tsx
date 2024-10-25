import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../store/store";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import { Superhero } from "./components/superhero/superhero";
import { DataStatus } from "../../enums/data-status.enum";
import { Button } from "../../components/button/button";
import styles from "./superheroes.module.css";

const Superheroes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { superheroes, dataStatus } = useSelector((state: RootState) => ({
    superheroes: state.superheroes.superheroes,
    dataStatus: state.superheroes.dataStatus
  }));

  useEffect(() => {
    dispatch(superheroesActions.getSuperheroes());
  }, [dispatch]);

  const handleAddSuperhero = useCallback(() => {
    navigate("/superheroes/create");
  }, [navigate]);

  const isLoading = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.container}>
      <h2>Superheroes</h2>
      {isLoading && "Loading..."}
      {superheroes &&
        superheroes.map(superhero => (
          <Superhero superhero={superhero} key={superhero.id} />
        ))}
      <div>
        <Button
          label="Add Superhero"
          onClick={handleAddSuperhero}
          type="button"
        />
      </div>
    </div>
  );
};

export { Superheroes };
