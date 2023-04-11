import React, { Fragment, useState } from "react";
import styles from "./SideBar.module.css";

const SideBar = ({ children, className }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const closeMenu = () => {
    setOpenMenu(false);
  };
  return (
    <Fragment>
      <div
        className={
          openMenu ? `${styles.sideBar} ${styles.active}` : `${styles.sideBar}`
        }
      >
        {children}
      </div>
      <div
        onClick={toggleMenu}
        className={
          openMenu ? `${styles.menuBtn} ${styles.active}` : `${styles.menuBtn}`
        }
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      {openMenu && <div onClick={closeMenu} className={styles.overflow}></div>}
    </Fragment>
  );
};

export default SideBar;
