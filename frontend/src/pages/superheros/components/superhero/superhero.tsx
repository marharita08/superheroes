import { SuperheroShortDto } from "../../../../types/superhero-short-dto.type";
import styles from "./superhero.module.css";

type Properties = {
  superhero: SuperheroShortDto;
};

const Superhero: React.FC<Properties> = ({ superhero }) => {
  return (
    <div className={styles.container}>
      <img src={superhero.image ?? undefined} alt={superhero.nickname} className={styles.image} />
      <h3>{superhero.nickname}</h3>
    </div>
  );
};

export { Superhero };
