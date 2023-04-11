import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Edit from "./Edit";
import { updateUser } from "../../../Redux/User/UserSlice";
import { useNavigate } from "react-router-dom";

const EditEmail = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(auth._id, formData));
    e.target.reset();
    navigate("/admin/dashboard");
  };
  return (
    <Edit
      name="email"
      currentPassword="currentPassword"
      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      passChange={(e) =>
        setFormData({ ...formData, currentPassword: e.target.value })
      }
      onSubmit={handleSubmit}
      type="email"
      title="Change Your Email"
      placeholder={email}
    />
  );
};

export default EditEmail;
