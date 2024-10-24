import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { SuperheroCreateUpdateSchema } from "../../validation-schemas/superhero.validation-schema";
import { Input } from "../input/input";


type SuperheroFormData = z.infer<typeof SuperheroCreateUpdateSchema>;

type Props = {
  defaultValues: SuperheroFormData;
  onSubmit: (data: SuperheroFormData) => void;
};

const SuperheroForm: React.FC<Props> = ({ defaultValues, onSubmit }) => {
  const { control, handleSubmit, formState: { errors }, reset } = useForm<SuperheroFormData>({
    resolver: zodResolver(SuperheroCreateUpdateSchema), 
    defaultValues: defaultValues,
    mode: "onBlur", 
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const onFormSubmit: SubmitHandler<SuperheroFormData> = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
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
        rows={4}
        placeholder="Enter origin description"
        errors={errors}
        control={control}
        name="originDescription"
      />

      <Input
        label="Superpowers"
        rows={4}
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

      <div>
        <label>Images (URLs)</label>
        {fields.map((field, index) => (
          <div key={field.id}>
            <Input
              label={`Image URL ${index + 1}`}
              placeholder="Enter image URL"
              errors={errors}
              control={control}
              name={`images.${index}.url`}
            />
            <button type="button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={() => append({ url: "" })}>Add Image</button>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export { SuperheroForm };
