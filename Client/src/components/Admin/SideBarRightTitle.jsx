import React from "react";
import styles from "./SideBarRightTitle.module.css";

const SideBarRightTitle = ({ title, className }) => {
  return <h2 className={`${styles.title} ${className}`}>{title}</h2>;
};

export default SideBarRightTitle;
