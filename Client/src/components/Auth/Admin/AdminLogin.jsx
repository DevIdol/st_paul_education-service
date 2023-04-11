import React, { useEffect, useState } from "react";
import styles from "../Student/StudentLogin.module.css";
import Card from "../../../View/Card";
import Input from "../../../View/Input";
import Button from "../../../View/Button";
import { loginUser } from "../../../Redux/UserAuthSlice";
import { useDispatch } from "react-redux";

const AdminLogin = ({ auth }) => {
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);
  const initialState = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState(initialState);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
    e.target.reset();
  };
  const showPassword = () => {
    setShowPass(!showPass);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `School Management | Admin Login`;
  }, []);

  return (
    <Card className={styles.card}>
      <h3>Admin Login</h3>
      {auth.loginStatus === "rejected" && (
        <p className={styles.error}>{auth.loginError}</p>
      )}
      <form onSubmit={loginHandler}>
        <Input
          type="email"
          placeholder="Enter Your Eamil"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <Input
          type={showPass ? "text" : "password"}
          placeholder="Enter Your Password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <div className={styles.showPass}>
          <Input onClick={showPassword} type="checkbox" />
          <span>Show Passsword</span>
        </div>
        <Button
          className={styles.loginBtn}
          pending={auth.loginStatus}
          type="submit"
          text="Login"
        />
      </form>
    </Card>
  );
};

export default AdminLogin;
