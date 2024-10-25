import { Control, FieldErrors } from "react-hook-form";
import { useCallback } from "react";

import { Button } from "../../button/button";
import { Input } from "../../input/input";
import styles from "./image-row.module.css";

type Properties = {
  index: number;
  control: Control<any>;
  errors: FieldErrors<any>;
  remove: (index: number) => void;
};

const ImageRow: React.FC<Properties> = ({ index, control, errors, remove }) => {
  const handleRemove = useCallback(() => {
    remove(index);
  }, [remove, index]);

  return (
    <div className={styles.image}>
      <div className={styles.image_field}>
        <Input
          label={`Image URL ${index + 1}`}
          placeholder="Enter image URL"
          errors={errors}
          control={control}
          name={`images.${index}.link`}
        />
      </div>
      <div>
        <Button label="Remove" type="button" onClick={handleRemove} />
      </div>
    </div>
  );
};

export { ImageRow };
