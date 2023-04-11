import React, { Fragment } from "react";
import styles from "./NavBar.module.css";
import { Outlet, Link } from "react-router-dom";
const NavBar = () => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>
          <Link className={styles.logo} to={"/"}>St.Paul's Education Service</Link>
        </h1>
      </header>
      <Outlet />
    </Fragment>
  );
};

export default NavBar;
