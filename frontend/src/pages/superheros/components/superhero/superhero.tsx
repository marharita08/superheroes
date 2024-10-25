import { Link } from "react-router-dom";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../../../store/store";
import { actions as superheroesActions } from "../../../../store/superheroes/superheroes";
import { SuperheroShortDto } from "../../../../types/superhero-short-dto.type";
import styles from "./superhero.module.css";
import { Button } from "../../../../components/button/button";

type Properties = {
  superhero: SuperheroShortDto;
};

const Superhero: React.FC<Properties> = ({ superhero }) => {
  const dispatch: AppDispatch = useDispatch();

  const handleDelete = useCallback(() => {
    dispatch(superheroesActions.deleteSuperhero(superhero.id));
  }, [dispatch, superhero]);

  return (
    <div className={styles.container}>
      <img
        src={superhero.image?.link}
        alt={superhero.nickname}
        className={styles.image}
      />
      <div className={styles.name}>
        <Link to={`/superheroes/${superhero.id}`}>
          <h3>{superhero.nickname}</h3>
        </Link>
      </div>
      <div>
        <Button label="Delete" onClick={handleDelete} />
      </div>
    </div>
  );
};

export { Superhero };
