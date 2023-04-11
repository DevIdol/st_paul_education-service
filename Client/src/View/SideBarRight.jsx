import React from "react";
import styles from "./SideBarRight.module.css";

const SideBarRight = ({ children, className }) => {
  return (
    <div className={`${styles.sideBarRight} ${className}`}>{children}</div>
  );
};

export default SideBarRight;
