import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const StudentHome = ({auth}) => {
  return (
    <div className={styles.homeWrapper}>
      <h2>Welcome! {auth.name}</h2>
      <Link className={styles.link} to={"/students/marks"}>
        <h3>Click To Check Your Result</h3>
      </Link>
    </div>
  );
};

export default StudentHome;
