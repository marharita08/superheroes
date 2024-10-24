import {
  useController,
  FieldErrors,
  FieldValues,
  Control,
  FieldPath
} from "react-hook-form";
import styles from "./input.module.css";

type Properties<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  rows?: number;
  type?: string;
  name: FieldPath<T>;
};

const Input = <T extends FieldValues>({
  label,
  errors,
  rows,
  placeholder,
  type = "text",
  name,
  control
}: Properties<T>): JSX.Element => {
  const { field } = useController({ control, name });

  const error = errors?.[name]?.message;
  const hasError = Boolean(error);

  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {rows && rows > 1 ? (
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          {...field}
          className={styles.input}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...field}
          className={styles.input}
        />
      )}
      {hasError && <span className={styles.error}>{error as string}</span>}
    </div>
  );
};

export { Input };
