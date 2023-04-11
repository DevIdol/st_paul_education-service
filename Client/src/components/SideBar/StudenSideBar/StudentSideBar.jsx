import React, { Fragment } from "react";
import styles from "./StudentSideBar.module.css";
import ActiveLink from "../../ActiveLink/ActiveLink";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";
import { url } from "../../../Redux/Api";
import { useDispatch } from "react-redux";
import { logoutStudent } from "../../../Redux/StudentAuth";
import { toast } from "react-toastify";

const StudentSideBar = () => {
  const sideBarItems = [
    {
      path: "/students/marks",
      name: "Marks",
    },
  ];
  const confirm = useConfirm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const logoutHandler = async () => {
    await confirm({
      title: "Are you sure to Logout?",
      confirmationText: "Yes",
      cancellationText: "No",
    })
      .then(async () => {
        const data = await axios.post(`${url}/auth/students/logout`);
        return data;
        
      })
      .then(({ data }) => {
        dispatch(logoutStudent(null));
        navigate("/");
        toast.success(`${data.message}`, {
          position: "bottom-left",
          autoClose: 2000,
        });
      })
      .catch((error) => {
        toast.success(`${error.message}`, {
          position: "bottom-left",
          autoClose: 1200,
        });
      });
  };
  return (
    <Fragment>
      <SideBar>
        <ul className={styles.sideBarList}>
          {sideBarItems.map((item, index) => {
            return (
              <li key={index}>
                <ActiveLink
                  onClick={() => window.scrollTo(0, 0)}
                  className={styles.link}
                  path={item.path}
                  name={item.name}
                />
              </li>
            );
          })}
          <li>
            <ActiveLink
              onClick={logoutHandler}
              className={styles.link}
              name="Logout"
            />
          </li>
        </ul>
      </SideBar>
      <Outlet />
    </Fragment>
  );
};

export default StudentSideBar;
