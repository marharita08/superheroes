import { useController, FieldErrors, FieldValues, Control, FieldPath } from "react-hook-form";

type Properties<T extends FieldValues> = {
  label: string;
  control: Control<T>;
  errors?: FieldErrors<T>;
  placeholder?: string;
  rows?: number;
  type?: string;
  name: FieldPath<T>;
};

const Input = <T extends FieldValues>({ label, errors, rows, placeholder, type = "text", name, control } : Properties<T>): JSX.Element => {

  const { field } = useController({ control, name });

	const error = errors?.[name]?.message;
	const hasError = Boolean(error);

  return (
    <div>
      <label htmlFor={name}>{label}</label>
      {rows && rows > 1 ? (
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          {...field}
        />
      ) : (
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          {...field}
        />
      )}
      {hasError && <p style={{ color: "red" }}>{error as string}</p>}
    </div>
  );
};

export { Input };
