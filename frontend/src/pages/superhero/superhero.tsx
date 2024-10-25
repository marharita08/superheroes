import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import { DataStatus } from "../../enums/data-status.enum";
import styles from "./superhero.module.css";
import { Button } from "../../components/button/button";

const Superhero: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const { superhero, dataStatus } = useSelector((state: RootState) => ({
    superhero: state.superheroes.currentSuperhero,
    dataStatus: state.superheroes.dataStatus
  }));

  useEffect(() => {
    if (id) {
      dispatch(superheroesActions.getSuperheroById(+id));
    }
  }, [dispatch, id]);

  const handleEdit = useCallback(() => {
    navigate(`/superheroes/edit/${id}`);
  }, [navigate, id]);

  const handleBackToList = useCallback(() => {
    navigate("/superheroes");
  }, [navigate]);

  const isLoading = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {isLoading && "Loading..."}
        {superhero && (
          <>
            <div className={styles.images}>
              {superhero.images?.map(image => (
                <img
                  src={image.link}
                  alt={superhero.nickname}
                  className={styles.image}
                  key={image.id}
                />
              ))}
            </div>
            <div className={styles.info}>
              <div className={styles.info_title}>Nickname:</div>
              <div>{superhero.nickname}</div>
              <div className={styles.info_title}>Real Name:</div>
              <div>{superhero.realName}</div>
              <div className={styles.info_title}>Origin Description:</div>
              <div>{superhero.originDescription}</div>
              <div className={styles.info_title}>Catch Phrase:</div>
              <div>{superhero.catchPhrase}</div>
              <div className={styles.info_title}>Superpowers:</div>
              <div>{superhero.superpowers}</div>
            </div>
            <div className={styles.buttons}>
              <Button label="Back to List" onClick={handleBackToList} />
              <Button label="Edit" onClick={handleEdit} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Superhero };
