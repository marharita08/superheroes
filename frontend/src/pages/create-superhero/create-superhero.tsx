import React, { useCallback } from "react";
import { z } from "zod";

import { SuperheroForm } from "../../components/superhero-form/superhero-form";
import { SuperheroCreateUpdateSchema } from "../../validation-schemas/superhero.validation-schema";
import styles from "./create-superhero.module.css";

type SuperheroCreateUpdateDto = z.infer<typeof SuperheroCreateUpdateSchema>;

const CreateSuperhero: React.FC = () => {
  const defaultValues: SuperheroCreateUpdateDto = {
    nickname: "",
    realName: "",
    originDescription: "",
    superpowers: "",
    catchPhrase: "",
    images: [{ url: "" }]
  };

  const handleFormSubmit = useCallback((data: SuperheroCreateUpdateDto) => {
    console.log("Superhero data:", data);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Create Superhero</h1>
        <SuperheroForm
          defaultValues={defaultValues}
          onSubmit={handleFormSubmit}
        />
      </div>
    </div>
  );
};

export { CreateSuperhero };
