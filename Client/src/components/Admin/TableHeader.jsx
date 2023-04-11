import React from "react";
import styles from "./TableHeader.module.css";
import { Link } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Tooltip } from "@material-ui/core";

const TabelHeader = ({ title, link, linkLabel, admin, openModal, onClick }) => {
  return (
    <div className={styles.tableHeaderWrapper}>
      <h3>{title}</h3>
      {admin && link && linkLabel && !openModal && (
        <Tooltip title={linkLabel} placement="left" arrow>
          <Link className={styles.link} to={link}>
            <AddCircleOutlineIcon className={styles.addIcon} />
          </Link>
        </Tooltip>
      )}
      {admin && !link && (
        <Tooltip onClick={onClick} title={linkLabel} placement="left" arrow>
          <div className={styles.link}>
            <AddCircleOutlineIcon className={styles.addIcon} />
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default TabelHeader;
