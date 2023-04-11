import React from "react";
import styles from "./Input.module.css";

const Input = ({
  onChange,
  onClick,
  type,
  name,
  value,
  placeholder,
  className,
  maxlength
}) => {
  return (
    <input
      onClick={onClick}
      onChange={onChange}
      className={`${styles.input} ${className}`}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      maxLength={maxlength}
    />
  );
};

export default Input;
