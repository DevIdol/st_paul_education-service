import React from "react";
import { FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import styles from "./Login.module.css";
import Card from "../../View/Card";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <Card className={styles.card}>
        <Link className={styles.link} to={"/students/login"}>
          <FaUsers className={styles.icon} />
          <h3>Signin As Student</h3>
        </Link>
      </Card>
      <Card className={styles.card}>
        <Link className={styles.link} to={"/admin/login"}>
          <MdAdminPanelSettings className={styles.icon} />
          <h3>Signin As Admin</h3>
        </Link>
      </Card>
    </div>
  );
};

export default Login;
