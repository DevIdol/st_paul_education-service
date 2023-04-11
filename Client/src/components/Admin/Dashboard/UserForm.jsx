import React from "react";
import SideBarRight from "../../../View/SideBarRight";
import Input from "../../../View/Input";
import Button from "../../../View/Button";
import styles from "./UserForm.module.css";

const UserFrom = ({ onSubmit, value, onChange, text, loading }) => {
  return (
    <SideBarRight className={styles.userFormWrapper}>
      <h2>Create New Admin</h2>
      <form className={styles.userForm} onSubmit={onSubmit}>
        <Input
          type="text"
          name="username"
          value={value}
          onChange={onChange}
          placeholder="Username"
        />
        <Input
          type="email"
          name="email"
          value={value}
          onChange={onChange}
          placeholder="Email"
        />
        <Input
          type="password"
          name="password"
          value={value}
          onChange={onChange}
          placeholder="Password"
        />
        <Button
          className={styles.submitBtn}
          loading={loading}
          type="submit"
          text={text}
        />
      </form>
    </SideBarRight>
  );
};

export default UserFrom;
