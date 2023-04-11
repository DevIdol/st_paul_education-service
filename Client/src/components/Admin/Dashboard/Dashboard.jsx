import React, { Fragment, useEffect } from "react";
import styles from "./Dashboard.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import SideBarRight from "../../../View/SideBarRight";
import { logoutUser } from "../../../Redux/UserAuthSlice";
import Card from "../../../View/Card";
import TabelHeader from "../TableHeader";
import TableList from "../Table";
import DownloadPDF from "../Download/DownloadPDF";
import { useDispatch, useSelector } from "react-redux";
import {
  VerifyAdmin,
  deleteUser,
  getUser,
  getUsers,
} from "../../../Redux/User/UserSlice";
import Loading from "../../Loading/Loading";
import { useConfirm } from "material-ui-confirm";
import SideBarRightTitle from "../SideBarRightTitle";
import { Button } from "@mui/material";
import { getStudents } from "../../../Redux/Student/StudentSice";

const adminColumns = [
  { id: "no", label: "No", minWidth: 40, align: "center" },
  { id: "username", label: "Username", minWidth: 180, align: "center" },
  { id: "email", label: "Email", minWidth: 180, align: "center" },
  { id: "role", label: "Role", minWidth: 100, align: "center" },
  { id: "verified", label: "Verify Admin", minWidth: 120, align: "center" },
  { id: "removed", label: "Delete", minWidth: 120, align: "center" },
];
const userColumns = [
  { id: "no", label: "No", minWidth: 40, align: "center" },
  { id: "username", label: "Username", minWidth: 180, align: "center" },
  { id: "email", label: "Email", minWidth: 180, align: "center" },
  { id: "role", label: "Role", minWidth: 100, align: "center" },
];
const tableColums = [
  { title: "No", field: "id" },
  { title: "Username", field: "username" },
  { title: "Email", field: "email" },
  { title: "Role", field: "role" },
];
function createAdminData(no, username, email, role, verified, removed) {
  return { no, username, email, role, verified, removed };
}
function createUserData(no, username, email, role) {
  return { no, username, email, role };
}

const Dashboard = () => {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const count = useSelector((state) => state.visitor.count);
  const auth = useSelector((state) => state.auth);
  const { user, users, success, loading } = useSelector((state) => state.users);
  const { students } = useSelector((state) => state.students);
  const usersData = users.map((user, index) => {
    return {
      id: index + 1,
      username: user.username,
      email: user.email,
      role: user.isAdmin,
    };
  });

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser(auth._id));
    dispatch(getStudents());
  }, [dispatch, auth._id]);

  const verifyAdminHanlde = (id) => {
    dispatch(VerifyAdmin(id));
  };

  const deleteHandler = async (userId, username) => {
    await confirm({
      title: `Are you sure to delete "${username}"?`,
      confirmationText: "Yes",
      cancellationText: "No",
    })
      .then(() => {
        dispatch(deleteUser(userId));
        if (success && userId === user._id) {
          dispatch(logoutUser(null));
          navigate("/");
        }
      })
      .catch(() => {});
  };

  let rows = users.map((user, index) =>
    auth.isAdmin
      ? createAdminData(
          index + 1,
          user.username,
          user.email,
          user.isAdmin ? "Admin" : "Editor",
          <Button
            className={styles.verifyBtn}
            onClick={() => verifyAdminHanlde(user._id)}
          >
            {user.isAdmin ? (
              <AiOutlineCheckCircle className={styles.admin} size={24} />
            ) : (
              <RxCrossCircled className={styles.user} size={24} />
            )}
          </Button>,
          <Button
            style={{ color: "tomato", fontWeight: 600 }}
            className={styles.deleteBtn}
            onClick={() => deleteHandler(user._id, user.username)}
          >
            Delete
          </Button>
        )
      : createUserData(
          index + 1,
          user.username,
          user.email,
          user.isAdmin ? "Admin" : "Editor"
        )
  );

  return (
    <SideBarRight className={styles.dashboardWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <SideBarRightTitle title="Admin Dashboard" />
          <div className={styles.cardWrapper}>
            <Card className={styles.card}>
              <Link className={styles.link} to={"/admin/dashboard"}>
                <h3> {users.length ?? 0}</h3>
                <p>User Count</p>
              </Link>
            </Card>
            <Card className={styles.card}>
              <Link className={styles.link} to={"/admin/dashboard"}>
                <h3> {students.length ?? 0}</h3>
                <p>Student Count</p>
              </Link>
            </Card>
            <Card className={styles.card}>
              <Link className={styles.link} to={"/admin/dashboard"}>
                <h3> {20}</h3>
                <p>Message Count</p>
              </Link>
            </Card>
            <Card className={styles.card}>
              <Link className={styles.link} to={"/admin/dashboard"}>
                <h3> {count ?? 0}</h3>
                <p>Visit Count</p>
              </Link>
            </Card>
          </div>
          <TabelHeader
            title="User Table"
            link="/admin/users/create"
            linkLabel="Create New Admin"
            admin={auth.isAdmin}
          />
          <TableList
            columns={auth.isAdmin ? adminColumns : userColumns}
            rows={rows}
          />
          {auth.isAdmin && (
            <DownloadPDF
              tableColums={tableColums}
              data={usersData}
              title="Admin List"
              fileName="admin-list"
            />
          )}
        </Fragment>
      )}
    </SideBarRight>
  );
};

export default Dashboard;
