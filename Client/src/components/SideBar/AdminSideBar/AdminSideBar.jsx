import React, { Fragment } from "react";
import styles from "../StudenSideBar/StudentSideBar.module.css";
import ActiveLink from "../../ActiveLink/ActiveLink";
import { Outlet, useNavigate } from "react-router-dom";
import SideBar from "../SideBar";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../Redux/UserAuthSlice";
import { url } from "../../../Redux/Api";
import axios from "axios";
import { useConfirm } from "material-ui-confirm";
import { toast } from "react-toastify";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const AdminSideBar = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthName = prevMonth.toLocaleString("default", { month: "long" });

  const sideBarItems = [
    {
      path: "/admin/dashboard",
      name: "Dashboard",
    },
    {
      path: "/admin/personal-info",
      name: "Personal Info",
    },
  ];
  const studentList = [
    {
      path: "/admin/students?grade=1",
      name: "Grade - 1",
    },
    {
      path: "/admin/students?grade=2",
      name: "Grade - 2",
    },
    {
      path: "/admin/students?grade=3",
      name: "Grade - 3",
    },
    {
      path: "/admin/students?grade=4",
      name: "Grade - 4",
    },
    {
      path: "/admin/students?grade=5",
      name: "Grade - 5",
    },
    {
      path: "/admin/students?grade=6",
      name: "Grade - 6",
    },
    {
      path: "/admin/students?grade=7",
      name: "Grade - 7",
    },
    {
      path: "/admin/students?grade=8",
      name: "Grade - 8",
    },
  ];
  const studentMarks = [
    {
      path: `/admin/marks/students?grade=1&month=${prevMonthName}`,
      name: "Grade - 1",
    },
    {
      path: `/admin/marks/students?grade=2&month=${prevMonthName}`,
      name: "Grade - 2",
    },
    {
      path: `/admin/marks/students?grade=3&month=${prevMonthName}`,
      name: "Grade - 3",
    },
    {
      path: `/admin/marks/students?grade=4&month=${prevMonthName}`,
      name: "Grade - 4",
    },
    {
      path: `/admin/marks/students?grade=5&month=${prevMonthName}`,
      name: "Grade - 5",
    },
    {
      path: `/admin/marks/students?grade=6&month=${prevMonthName}`,
      name: "Grade - 6",
    },
    {
      path: `/admin/marks/students?grade=7&month=${prevMonthName}`,
      name: "Grade - 7",
    },
    {
      path: `/admin/marks/students?grade=8&month=${prevMonthName}`,
      name: "Grade - 8",
    },
  ];
  const logoutHandler = async () => {
    await confirm({
      title: "Are you sure to Logout?",
      confirmationText: "Yes",
      cancellationText: "No",
    })
      .then(async () => {
        const data = await axios.post(`${url}/auth/logout`);
        return data;
        
      })
      .then(({ data }) => {
        dispatch(logoutUser(null));
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
              <li className={styles.sideItem} key={index}>
                <ActiveLink
                  onClick={() => window.scrollTo(0, 0)}
                  className={styles.link}
                  path={item.path}
                  name={item.name}
                />
              </li>
            );
          })}

          <Accordion
            className={styles.gradeWrapper}
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              fontWeight: 600,
            }}
          >
            <AccordionSummary
              style={{ color: "#f7fafd", fontSize: "18px" }}
              expandIcon={<ExpandMoreIcon style={{ color: "#f7fafd" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              Student List
            </AccordionSummary>
            <AccordionDetails className={styles.selectGrade}>
              {studentList.map((s, index) => {
                return (
                  <li key={index}>
                    <ActiveLink
                      onClick={() => window.scrollTo(0, 0)}
                      className={styles.link}
                      path={s.path}
                      name={s.name}
                    />
                  </li>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <Accordion
            className={styles.gradeWrapper}
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
            style={{
              backgroundColor: "transparent",
              boxShadow: "none",
              fontWeight: 600,
            }}
          >
            <AccordionSummary
              style={{ color: "#f7fafd", fontSize: "18px", padding: 0 }}
              expandIcon={<ExpandMoreIcon style={{ color: "#f7fafd" }} />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              Student Marks
            </AccordionSummary>
            <AccordionDetails className={styles.selectGrade}>
              {studentMarks.map((s, index) => {
                return (
                  <li key={index}>
                    <ActiveLink
                      onClick={() => window.scrollTo(0, 0)}
                      className={styles.link}
                      path={s.path}
                      name={s.name}
                    />
                  </li>
                );
              })}
            </AccordionDetails>
          </Accordion>
          <li className={styles.logout}>
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

export default AdminSideBar;
