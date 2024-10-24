import React, { useCallback } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SuperheroCreateUpdateSchema } from "../../validation-schemas/superhero.validation-schema";
import { Input } from "../input/input";
import { Button } from "../button/button";
import { ImageRow } from "./components/image-row";
import styles from "./superhero-form.module.css";

type SuperheroFormData = z.infer<typeof SuperheroCreateUpdateSchema>;

type Props = {
  defaultValues: SuperheroFormData;
  onSubmit: (data: SuperheroFormData) => void;
};

const SuperheroForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SuperheroFormData>({
    resolver: zodResolver(SuperheroCreateUpdateSchema),
    defaultValues: defaultValues,
    mode: "onBlur"
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images"
  });

  const handleFormSubmit: SubmitHandler<SuperheroFormData> = useCallback(
    data => {
      onSubmit(data);
      reset();
    },
    [onSubmit, reset]
  );

  const handleAddImage = useCallback(() => {
    append({ url: "" });
  }, [append]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.form}>
      <Input
        label="Nickname"
        placeholder="Enter nickname"
        errors={errors}
        control={control}
        name="nickname"
      />

      <Input
        label="Real Name"
        placeholder="Enter real name"
        errors={errors}
        control={control}
        name="realName"
      />

      <Input
        label="Origin Description"
        rows={2}
        placeholder="Enter origin description"
        errors={errors}
        control={control}
        name="originDescription"
      />

      <Input
        label="Superpowers"
        rows={2}
        placeholder="Enter superpowers"
        errors={errors}
        control={control}
        name="superpowers"
      />

      <Input
        label="Catch Phrase"
        placeholder="Enter catch phrase"
        errors={errors}
        control={control}
        name="catchPhrase"
      />

      <div className={styles.images}>
        <label className={styles.label}>Images (URLs)</label>
        {fields.map((field, index) => (
          <ImageRow
            key={field.id}
            index={index}
            control={control}
            errors={errors}
            remove={remove}
          />
        ))}
        <Button label="Add Image" type="button" onClick={handleAddImage} />
      </div>
      <Button label="Save" type="submit" />
    </form>
  );
};

export { SuperheroForm };
