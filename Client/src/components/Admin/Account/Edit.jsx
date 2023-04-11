import React, { Fragment } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { BiEditAlt } from "react-icons/bi";
import Input from "../../../View/Input";
import styles from "./Edit.module.css";
import { useState } from "react";

const Edit = ({
  name,
  currentPassword,
  onChange,
  passChange,
  onSubmit,
  type,
  title,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (e) => {
    e.preventDefault();
    setOpen(false);
  };
  return (
    <Fragment>
      <Button onClick={handleOpen}>
        <BiEditAlt className={styles.edit} />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modelBox}>
          <h4 className={styles.title}>{title}</h4>
          <form onSubmit={onSubmit}>
            <Input
              name={currentPassword}
              type="password"
              placeholder="Current Password"
              onChange={passChange}
            />
            <Input
              name={name}
              type={type}
              placeholder={placeholder}
              onChange={onChange}
            />
            <div className={styles.btn}>
              <button className={styles.closeBtn} onClick={handleClose}>
                Close
              </button>
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </Fragment>
  );
};

export default Edit;
