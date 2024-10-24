import styles from "./button.module.css";

type Properties = {
  label: string;
  type: "submit" | "button";
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({ label, type, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={styles.button}>
      {label}
    </button>
  );
};

export { Button };
