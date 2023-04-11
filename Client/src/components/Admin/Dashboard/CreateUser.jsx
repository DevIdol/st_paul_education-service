import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../../Redux/User/UserSlice";
import UserFrom from "./UserForm";

const CreateUser = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.users);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createUser(userData));
    e.target.reset();
  };
  return (
    <Fragment>
      <UserFrom
        onSubmit={handleSubmit}
        onChange={handleChange}
        value={userData.value}
        loading={loading}
        text="Create"
      />
    </Fragment>
  );
};

export default CreateUser;
