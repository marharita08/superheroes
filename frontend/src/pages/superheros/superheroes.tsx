import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { AppDispatch, RootState } from "../../store/store";
import { actions as superheroesActions } from "../../store/superheroes/superheroes";
import { Superhero } from "./components/superhero/superhero";
import { DataStatus } from "../../enums/data-status.enum";
import { Button } from "../../components/button/button";
import styles from "./superheroes.module.css";

const PAGE_SIZE = 3;

const Superheroes: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { superheroes, dataStatus, totalCount } = useSelector((state: RootState) => ({
    superheroes: state.superheroes.superheroes,
    dataStatus: state.superheroes.dataStatus,
    totalCount: state.superheroes.totalCount
  }));
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(superheroesActions.getSuperheroes({ page, pageSize: PAGE_SIZE }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(superheroesActions.getSuperheroesCount());
  }, [dispatch]);

  const handleAddSuperhero = useCallback(() => {
    navigate("/superheroes/create");
  }, [navigate]);

  const handleNext = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const handlePrevious = useCallback(() => {
    setPage(page - 1);
  }, [page]);

  const maxPage = Math.ceil(totalCount / PAGE_SIZE);

  const isLoading = dataStatus === DataStatus.PENDING;

  return (
    <div className={styles.container}>
      <h2>Superheroes</h2>
      {isLoading && "Loading..."}
      {superheroes && (
        <>
          <div className={styles.buttons}>
            <div className={styles.button}>
              <Button
                label="Previous"
                isDisabled={page === 1}
                onClick={handlePrevious}
              />
            </div>
            <div className={styles.button}>
              <Button label="Next" onClick={handleNext} isDisabled={page >= maxPage} />
            </div>
          </div>
          {superheroes.map(superhero => (
            <Superhero superhero={superhero} key={superhero.id} />
          ))}
        </>
      )}
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
