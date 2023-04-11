import React from "react";
import styles from "./InputSelect.module.css";

const InputSelect = ({ name, value, onChange, children, className }) => {
  return (
    <select
      className={`${styles.inputSelect} ${className}`}
      name={name}
      value={value}
      onChange={onChange}
    >
      {children}
    </select>
  );
};

export default InputSelect;
