import React from "react";
import styles from "./Message.module.css";
import SideBarRight from "../../../View/SideBarRight";

const Messages = () => {
  return (
    <SideBarRight className={styles.markWrapper}>
      <h2>Message From Students</h2>
    </SideBarRight>
  );
};

export default Messages;
