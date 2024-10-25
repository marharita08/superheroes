import { Link } from "react-router-dom";

import { SuperheroShortDto } from "../../../../types/superhero-short-dto.type";
import styles from "./superhero.module.css";

type Properties = {
  superhero: SuperheroShortDto;
};

const Superhero: React.FC<Properties> = ({ superhero }) => {
  return (
    <div className={styles.container}>
      <img
        src={superhero.image?.link}
        alt={superhero.nickname}
        className={styles.image}
      />
      <Link to={`/superheroes/${superhero.id}`}>
        <h3>{superhero.nickname}</h3>
      </Link>
    </div>
  );
};

export { Superhero };
