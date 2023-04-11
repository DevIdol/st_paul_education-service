import React, { Fragment, useEffect } from "react";
import styles from "./NotFound.module.css";
import { Link, useNavigate } from "react-router-dom";

const NotFound = ({ auth }) => {
  const navigate = useNavigate();
  let isLogged = auth.loginStatus;
  useEffect(() => {
    isLogged === "success" && navigate("/");
  }, [isLogged, navigate]);
  return (
    <Fragment>
      {!isLogged && (
        <div className={styles.notFound}>
          <h3>404 | Page Not Found!</h3>
          <Link className={styles.link} to={"/"}>
            Go To Home Page
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default NotFound;
