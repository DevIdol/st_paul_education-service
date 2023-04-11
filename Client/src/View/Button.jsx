import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, type, text, className, pending, loading }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} ${styles.button}`}
    >
      {pending === "pending" || loading ? "Loading..." : text}
    </button>
  );
};

export default Button;
