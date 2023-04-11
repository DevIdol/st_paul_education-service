import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getUser } from "../../Redux/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";

const AdminHome = ({ auth }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(auth._id));
  }, [dispatch, auth._id]);
  return (
    <div className={styles.homeWrapper}>
      <h2>Welcome! {user.username ?? auth.username}</h2>
      <Link className={styles.link} to={"/admin/dashboard"}>
        <h3>Go To Admin Panel</h3>
      </Link>
    </div>
  );
};

export default AdminHome;
