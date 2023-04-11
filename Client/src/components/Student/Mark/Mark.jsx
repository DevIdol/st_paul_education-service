import React, { Fragment, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import styles from "./Mark.module.css";
import SideBarRight from "../../../View/SideBarRight";
import { getStudentMark } from "../../../Redux/Mark/MarkSlice";
import { useDispatch, useSelector } from "react-redux";
import TabelHeader from "../../Admin/TableHeader";
import DataNotFound from "../../NotFound/DataNotFound";
import { useParams } from "react-router-dom";
import { getStudent } from "../../../Redux/Student/StudentSice";
import Loading from "../../Loading/Loading";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow key={row._id}>
        <TableCell align="center">{props.index}</TableCell>
        <TableCell align="center">{row.month}</TableCell>
        <TableCell align="center">{row.average + "%"}</TableCell>
        <TableCell align="center">{row.attendance + "%"}</TableCell>
        <TableCell align="center">{row.year}</TableCell>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          align="center"
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell className={styles.tbCell} align="center">
                    No
                  </TableCell>
                  <TableCell className={styles.tbCell} align="center">
                    Subject Name
                  </TableCell>
                  <TableCell className={styles.tbCell} align="center">
                    Mark
                  </TableCell>
                  <TableCell className={styles.tbCell} align="center">
                    Remark
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.subjects.map((subject, index) => (
                  <TableRow key={subject._id}>
                    <TableCell align="center">{index + 1}</TableCell>
                    <TableCell align="center">{subject.name}</TableCell>
                    <TableCell align="center">{subject.mark}</TableCell>
                    <TableCell align="center">{subject.remark}</TableCell>
                  </TableRow>
                ))}
                <TableRow className={styles.totalMark}>
                  <TableCell
                    className={styles.tbCell}
                    align="right"
                    colSpan={3}
                  >
                    Total Mark: {row.totalMark}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const Mark = ({ auth }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { studentId } = useParams();
  const { marks, loading } = useSelector((state) => state.marks);
  const { student } = useSelector((state) => state.students);


  useEffect(() => {
    dispatch(getStudentMark(auth._id ?? studentId));
    dispatch(getStudent(auth._id ?? studentId));
  }, [dispatch, auth._id, studentId]);
  return (
    <SideBarRight className={styles.markWrapper}>
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <TabelHeader
            title={`The Result Sheet Of ${auth.name ?? student.name}`}
          />
          {marks.length && student.name ? (
            <Fragment>
              <TableContainer component={Paper}>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        No
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Month
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Average
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Attendance
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        Year
                      </TableCell>
                      <TableCell className={styles.tbHeaderRow} align="center">
                        CheckMark
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {marks.map((row, index) => (
                      <Row key={row._id} row={row} index={index + 1} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Fragment>
          ) : (
            <DataNotFound text="No Result Yet" />
          )}
        </Fragment>
      )}
    </SideBarRight>
  );
};

export default Mark;
