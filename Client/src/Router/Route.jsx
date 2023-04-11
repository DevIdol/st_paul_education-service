import React, { Fragment } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import StudentLogin from "../components/Auth/Student/StudentLogin";
import Login from "../components/Auth/Login";
import AdminLogin from "../components/Auth/Admin/AdminLogin";
import StudentSideBar from "../components/SideBar/StudenSideBar/StudentSideBar";
import NotFound from "../components/NotFound/NotFound";
import StudentHome from "../components/Home/StudentHome";
import Mark from "../components/Student/Mark/Mark";
import Contact from "../components/Student/Contact/Contact";
import AdminSideBar from "../components/SideBar/AdminSideBar/AdminSideBar";
import AdminHome from "../components/Home/AdminHome";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import Messages from "../components/Admin/MessageList/Message";
import { useSelector } from "react-redux";
import CreateUser from "../components/Admin/Dashboard/CreateUser";
import PersonalInfo from "../components/Admin/Account/PersonalInfo";
import CreateStudent from "../components/Admin/StudentList/CreateStudent/CreateStudent";
import StudentMarkTable from "../components/Admin/StudentMarks/StudentMark";
import CreateMark from "../components/Admin/StudentMarks/CreateMark/CreateMark";
import EditMark from "../components/Admin/StudentMarks/CreateMark/EditMark";
import StudentTable from "../components/Admin/StudentList/StudentTable";

const Route = () => {
  const authUser = useSelector((state) => state.auth);
  const authStudent = useSelector((state) => state.authstudent);
  const student = authStudent._id;
  const user = authUser._id;
  const admin = authUser.isAdmin;
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: student
        ? [
            {
              path: "/",
              element: <StudentHome auth={authStudent} />,
            },
            {
              path: "/students",
              element: <StudentSideBar />,
              children: [
                {
                  path: "marks",
                  element: <Mark auth={authStudent} />,
                },
                {
                  path: "contact",
                  element: <Contact />,
                },
              ],
            },
          ]
        : user
        ? [
            {
              path: "/",
              element: <AdminHome auth={authUser} />,
            },
            {
              path: "/admin",
              element: <AdminSideBar />,
              children: [
                {
                  path: "dashboard",
                  element: <Dashboard />,
                },
                {
                  path: "personal-info",
                  element: <PersonalInfo />,
                },
                {
                  path: "users/create",
                  element: admin ? (
                    <CreateUser />
                  ) : (
                    <NotFound auth={authUser} />
                  ),
                },
                {
                  path: "students/create",
                  element: <CreateStudent />,
                },
                {
                  path: "students",
                  element: <StudentTable />,
                },
                {
                  path: "marks/create/:studentId",
                  element: <CreateMark />,
                },
                {
                  path: "marks/students",
                  element: <StudentMarkTable />,
                },
                {
                  path: "marks/edit/:markId",
                  element: <EditMark />,
                },
                {
                  path: "students/marks/:studentId",
                  element: <Mark auth='' />,
                },
                {
                  path: "messages",
                  element: <Messages />,
                },
              ],
              errorElement: <NotFound auth={authUser} />,
            },
          ]
        : [
            {
              path: "/",
              element: <Login />,
            },
            {
              path: "/students/login",
              element: <StudentLogin auth={authStudent} />,
            },
            {
              path: "/admin/login",
              element: <AdminLogin auth={authUser} />,
            },
          ],
      errorElement: <NotFound auth={authUser._id ? authUser : authStudent} />,
    },
  ]);
  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  );
};

export default Route;
