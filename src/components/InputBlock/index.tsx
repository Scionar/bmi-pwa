import React from "react";
import styles from "./InputBlock.module.css";

type InputBlockProps = {
  name: string;
  value?: string;
  handler: (event: React.FormEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
};

const InputBlock = ({ name, value, handler, style }: InputBlockProps) => {
  return (
    <div className={styles.container} style={style}>
      <span className={styles.name}>{name}</span>
      <input
        placeholder="0"
        className={styles.input}
        value={value}
        onChange={(event) => handler(event)}
        maxLength={5}
        enterKeyHint="enter"
        size={5}
        inputMode="decimal"
      />
    </div>
  );
};

export default InputBlock;
