import React, { useState } from "react";
import styles from "./StudentLogin.module.css";
import Card from "../../../View/Card";
import Input from "../../../View/Input";
import Button from "../../../View/Button";
import { useDispatch } from "react-redux";
import { loginStudent } from "../../../Redux/StudentAuth";

const StudentLogin = ({ auth }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    studentNo: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginStudent(formData));
  };

  return (
    <Card className={styles.card}>
      <h3>Student Login</h3>
      {auth.loginStatus === "rejected" && (
        <p className={styles.error}>{auth.loginError}</p>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          value={formData.email}
          onChange={handleChange}
          placeholder="Student Name"
        />
        <Input
          type="text"
          name="studentNo"
          value={formData.password}
          onChange={handleChange}
          placeholder="Student ID"
        />
        <Button
          pending={auth.loginStatus}
          className={styles.loginBtn}
          type="text"
          text="Login"
        />
      </form>
    </Card>
  );
};

export default StudentLogin;
