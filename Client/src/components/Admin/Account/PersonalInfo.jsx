import React, { useEffect } from "react";
import SideBarRight from "../../../View/SideBarRight";
import SideBarRightTitle from "../SideBarRightTitle";
import styles from "./PersonalInfo.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/User/UserSlice";
import EditUsername from "./EditUsername";
import EditEmail from "./EditEmail";
import ChangePassword from "./ChangePassword";

export const DataWrapper = ({ type, info, className, edit }) => (
  <div className={`${styles.dataWrapper} ${className}`}>
    <h3>{type}</h3>
    <div className={styles.userInfo}>
      <p>{info}</p>
      {edit}
    </div>
  </div>
);

const PersonalInfo = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUser(auth._id));
  }, [dispatch, auth._id]);
  return (
    <SideBarRight>
      <SideBarRightTitle title="Personal Info" />
      <div className={styles.personalInfoCard}>
        <DataWrapper
          type="Username"
          info={user.username ?? auth.username}
          edit={<EditUsername username={user.username ?? auth.username} />}
        />
        <DataWrapper
          className={styles.email}
          type="Email"
          info={user.email ?? auth.email}
          edit={<EditEmail email={user.email ?? auth.email} />}
        />
        <DataWrapper
          type="Password"
          info="* * * * * * * *"
          edit={<ChangePassword password="New Password" />}
        />
      </div>
    </SideBarRight>
  );
};

export default PersonalInfo;
