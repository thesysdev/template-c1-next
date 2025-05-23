import { useRef } from "react";
import styles from "./InputField.module.scss";
import { m } from "framer-motion";

interface InputFieldProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (prompt: string) => void;
  placeholder?: string;
  translated?: boolean;
  top?: number;
}

export const InputField = ({
  handleSubmit,
  value,
  onChange,
  placeholder,
  translated,
  top,
}: InputFieldProps) => {
  const inputFieldRef = useRef<HTMLDivElement>(null);

  return (
    <m.div
      ref={inputFieldRef}
      className={`${styles.inputField} ${
        translated ? styles.translatedInputField : ""
      }`}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{ duration: 2, ease: "easeInOut" }}
      style={{ "--top": `${top}px` } as React.CSSProperties}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full flex items-center justify-center"
      >
        <input
          value={value}
          placeholder={placeholder}
          onChange={({ target: { value } }) => onChange(value)}
          autoFocus
        />
      </form>
    </m.div>
  );
};
