import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import { Superhero } from "./components/superhero/superhero";
import { DataStatus } from "../../enums/data-status.enum";
import styles from "./superheroes.module.css";

const Superheroes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { superheroes, dataStatus } = useSelector((state: RootState) => ({
    superheroes: state.superheroes.superheroes,
    dataStatus: state.superheroes.dataStatus
  }));

  useEffect(() => {
    dispatch(superheroesActions.getSuperheroes());
  }, [dispatch]);

  const isLoading = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.container}>
      <h2>Superheroes</h2>
      {isLoading
        ? "Loading..."
        : superheroes.map(superhero => (
            <Superhero superhero={superhero} key={superhero.id} />
          ))}
    </div>
  );
};

export { Superheroes };
