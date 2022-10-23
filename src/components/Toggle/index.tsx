import React, { MouseEventHandler } from "react";
import styles from "./Toggle.module.css";

type Option = {
  name: string;
  value: string;
};

type ToggleProps = {
  handler: MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  options: Option[];
  selected: string;
};

const Toggle = ({ handler, style, options = [], selected }: ToggleProps) => {
  return (
    <div className={styles.container} style={style}>
      {options.map((item: Option) => {
        const classes = [styles.option];
        if (item.value === selected) classes.push(styles.selectedOption);
        return <button key={item.value} className={classes.join(' ')} value={item.value} onClick={handler}>{item.name}</button>;
      })}
    </div>
  );
};

export default Toggle;
