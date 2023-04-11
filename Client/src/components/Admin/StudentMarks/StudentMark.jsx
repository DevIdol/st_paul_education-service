import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  IconButton,
  makeStyles,
  styled,
  TablePagination,
} from "@material-ui/core";
import styles from "../Table.module.css";
import stylesTwo from "./StudentMarks.module.css";
import SideBarRight from "../../../View/SideBarRight";
import { KeyboardArrowUp, KeyboardArrowDown } from "@material-ui/icons";
import { deleteMark, getMarks } from "../../../Redux/Mark/MarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Loading from "../../Loading/Loading";
import DataNotFound from "../../NotFound/DataNotFound";
import { Button, Typography } from "@mui/material";
import { useConfirm } from "material-ui-confirm";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    borderBottom: "1px solid silver",
  },
}));
function createData(
  no,
  student,
  grade,
  attendance,
  remove,
  studentId,
  month,
  subjects,
  totalMark,
  average,
  averageRemark
) {
  return {
    no,
    student,
    grade,
    attendance,
    remove,
    studentId,
    month,
    subjects,
    totalMark,
    average,
    averageRemark,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const confirm = useConfirm();
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    await confirm({
      title: `Are you sure to delete "${row.student}'s Mark"?`,
      confirmationText: "Yes",
      cancellationText: "No",
    })
      .then(() => {
        dispatch(deleteMark(id, row.grade));
      })
      .catch(() => {});
  };

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">{row.no}</TableCell>
        <TableCell align="center" scope="row">
          {row.student}
        </TableCell>
        <TableCell align="center">{row.grade}</TableCell>
        <TableCell align="center">{row.attendance + "%" ?? 0 + "%"}</TableCell>
        <TableCell align="center">{row.average + "%" ?? 0 + "%"}</TableCell>
        <TableCell align="center">{row.averageRemark}</TableCell>
        <TableCell align="center">
          <Link
            to={`/admin/marks/edit/${row.remove}`}
            style={{ color: "teal", fontWeight: 600 }}
          >
            Edit
          </Link>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => deleteHandler(row.remove)}
            style={{ color: "tomato", fontWeight: 600 }}
          >
            Delete
          </Button>
        </TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography
              style={{ fontWeight: 600 }}
              variant="h6"
              gutterBottom
              component="div"
            >
              The Result Sheet Of {row.student}
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={styles.tbHeaderRow}>
                    No
                  </TableCell>
                  <TableCell className={styles.tbHeaderRow}>Subject</TableCell>
                  <TableCell align="center" className={styles.tbHeaderRow}>
                    Mark
                  </TableCell>
                  <TableCell className={styles.tbHeaderRow} align="center">
                    Remark
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.subjects.map((subject, index) => (
                  <StyledTableRow key={subject.name}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell style={{ fontWeight: 600 }} scope="row">
                      {subject.name ?? "-"}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 600 }}>
                      {subject.mark ?? 0}
                    </TableCell>
                    <TableCell align="center" style={{ fontWeight: 600 }}>
                      {subject.remark ?? "-"}
                    </TableCell>
                  </StyledTableRow>
                ))}
                <TableRow styles={{ backgroundColor: "#c0c0c0 !important" }}>
                  <TableCell align="center" className={styles.totalMark} />
                  <TableCell
                    style={{ fontWeight: 600 }}
                    className={styles.totalMark}
                    scope="row"
                    align="center"
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{ fontWeight: 600 }}
                    className={styles.totalMark}
                  >
                    {row.totalMark}
                  </TableCell>
                  <TableCell className={styles.totalMark} />
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function StudentMarkTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const today = new Date();
  const prevMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const prevMonthName = prevMonth.toLocaleString("default", { month: "long" });
  const grade = new URLSearchParams(location.search).get("grade");
  const searchParams = new URLSearchParams(location.search);
  const searchMonth = new URLSearchParams(window.location.search).get("month");
  const [, setMonthly] = useState(prevMonthName);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleMonthlyChange = (e) => {
    setMonthly(e.target.value);
    searchParams.set("month", e.target.value);
    const newUrl = location.pathname + "?" + searchParams.toString();
    window.history.replaceState(null, "", newUrl);
    dispatch(getMarks(grade));
  };

  useEffect(() => {
    dispatch(getMarks(grade));
  }, [dispatch, grade]);
  const { marks, loading } = useSelector((state) => state.marks);
  const rows = marks
    .map((v, index) => {
      if (v.subjects) {
        return createData(
          index + 1,
          v.name,
          v.grade,
          v.attendance,
          v.markId,
          v.studentId,
          v.month,
          v.subjects,
          v.totalMark,
          v.average,
          v.averageRemark
        );
      } else {
        return null;
      }
    })
    .filter((row) => row !== null && row !== undefined);
  const subjects = marks.map((mark) => mark.subjects);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <SideBarRight>
      {!loading && (
        <div className={stylesTwo.selectMonth}>
          <h2>Student Marks Of Grade - {grade}</h2>
          <select
            className={styles.selectMonth}
            value={searchMonth}
            onChange={handleMonthlyChange}
          >
            {months.map((m, index) => {
              return (
                <option key={index} value={m}>
                  {m}
                </option>
              );
            })}
          </select>
        </div>
      )}
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          {subjects.length &&
          subjects !== "" &&
          typeof subjects !== "undefined" ? (
            <Paper sx={{ width: "100%", overflow: "hidden" }}>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        No
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Name
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Grade
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Attendance
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Average
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Average Remark
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Edit
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Delete
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Check Mark
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {rows.map((row, index) => (
                      <Row key={index} row={row} no={index + 1} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          ) : (
            <DataNotFound
              text={`The Result Sheet Not Found In ${searchMonth}`}
            />
          )}
        </Fragment>
      )}
    </SideBarRight>
  );
}

export default StudentMarkTable;
