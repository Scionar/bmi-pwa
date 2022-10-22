import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  handler: MouseEventHandler<HTMLButtonElement>
  style?: React.CSSProperties;
};

const Button = ({ handler, style }: ButtonProps) => {
  return (
    <div className={styles.container} style={style}>
      <button className={styles.button} onClick={handler}>
        CALCULATE
      </button>
    </div>
  );
};

export default Button;
