import React, { Fragment, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import DataNotFound from "../../NotFound/DataNotFound";
import DownloadPDF from "../Download/DownloadPDF";
import TabelHeader from "../TableHeader";
import { useDispatch, useSelector } from "react-redux";
import { useConfirm } from "material-ui-confirm";
import { deleteStudent, getStudents } from "../../../Redux/Student/StudentSice";
import { useState } from "react";
import { Modal, TableCell, TableRow } from "@mui/material";
import EditStudent from "./CreateStudent/EditStudent";
import styles from "../Table.module.css";
import styleTwo from "./StudentTable.module.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import {
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  Typography,
  makeStyles,
  styled,
} from "@material-ui/core";

import { KeyboardArrowDown, KeyboardArrowUp } from "@material-ui/icons";
import CreateStudent from "./CreateStudent/CreateStudent";
import Loading from "../../Loading/Loading";
import SideBarRight from "../../../View/SideBarRight";

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

const tableColums = [
  { title: "No", field: "id" },
  { title: "Name", field: "name" },
  { title: "Student No", field: "number" },
  { title: "Grade", field: "grade" },
  { title: "Gender", field: "gender" },
  { title: "Academic Year", field: "year" },
];

function createStudentData(
  no,
  name,
  number,
  grade,
  gender,
  year,
  id,
  parentInfo
) {
  return {
    no,
    name,
    number,
    grade,
    gender,
    year,
    id,
    parentInfo,
  };
}

function Row(props) {
  const classes = useStyles();
  const { row, gradeNo } = props;
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const handleEditClick = (id) => {
    setSelectedStudentId(id);
    setOpenModal(true);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  const deleteHandler = async (studentId, name) => {
    await confirm({
      title: `Are you sure to delete "${name}"?`,
      confirmationText: "Yes",
      cancellationText: "No",
    })
      .then(() => {
        dispatch(deleteStudent(studentId, gradeNo));
      })
      .catch(() => {});
  };
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell align="center">{row.no}</TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.number}</TableCell>
        <TableCell align="center">{row.grade}</TableCell>
        <TableCell align="center">{row.gender}</TableCell>
        <TableCell align="center">{row.year}</TableCell>
        <TableCell align="center">
          <Link to={`/admin/marks/create/${row.id}`}>
            <AddCircleOutlineIcon style={{ color: "teal", fontWeight: 600 }} />
          </Link>
        </TableCell>
        <TableCell align="center">
          <Link
            to={`/admin/students/marks/${row.id}`}
            style={{ color: "teal", fontWeight: 600 }}
          >
            Marks
          </Link>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => handleEditClick(row.id)}
            style={{ color: "teal", fontWeight: 600 }}
          >
            Edit
          </Button>
        </TableCell>
        <TableCell align="center">
          <Button
            onClick={() => deleteHandler(row.id, row.name)}
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
              Parent Information of {row.name}
            </Typography>

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell align="center" className={styles.tbHeaderRow}>
                    Father Name
                  </TableCell>
                  <TableCell align="center" className={styles.tbHeaderRow}>
                    Mother Name
                  </TableCell>
                  <TableCell className={styles.tbHeaderRow} align="center">
                    Phone Number
                  </TableCell>
                  <TableCell className={styles.tbHeaderRow} align="center">
                    Address
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {row.parentInfo && (
                  <StyledTableRow>
                    <TableCell align="center">
                      {row.parentInfo.fatherName}
                    </TableCell>
                    <TableCell align="center">
                      {row.parentInfo.motherName}
                    </TableCell>
                    <TableCell align="center">{row.parentInfo.phNo}</TableCell>
                    <TableCell align="center">
                      {row.parentInfo.address}
                    </TableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styleTwo.editForm}>
          <EditStudent
            studentId={selectedStudentId}
            handleClose={handleClose}
          />
        </div>
      </Modal>
    </React.Fragment>
  );
}

function StudentTable() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const location = useLocation();
  const gradeNo = new URLSearchParams(location.search).get("grade");
  const { students, loading } = useSelector((state) => state.students);
  useEffect(() => {
    dispatch(getStudents(gradeNo));
  }, [dispatch, gradeNo]);

  const [openModal, setOpenModal] = useState(false);
  const openStudentCreate = () => {
    setOpenModal(true);
  };
  const handleClose = (e) => {
    e.preventDefault();
    setOpenModal(false);
  };
  const rows = students
    .map((s, index) => {
      if (s) {
        return createStudentData(
          index + 1,
          s.name,
          s.studentNo,
          s.grade,
          s.gender,
          s.academicYear,
          s._id,
          s.parentInfo
        );
      } else {
        return null;
      }
    })
    .filter((row) => row !== null && row !== undefined);

  const studentData = students.map((s, index) => {
    return {
      id: index + 1,
      name: s.name,
      number: s.studentNo,
      grade: s.grade,
      gender: s.gender,
      year: s.academicYear,
    };
  });
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
      {loading ? (
        <Loading />
      ) : (
        <Fragment>
          <TabelHeader
            title={`Student List of Grade - ${gradeNo}`}
            openModal={openModal}
            onClick={openStudentCreate}
            linkLabel="Add New Student"
            admin={auth.isAdmin || !auth.isAdmin}
          />
          {students.length ? (
            <Fragment>
              <Paper sx={{ width: "100%", overflow: "hidden" }}>
                <TableContainer component={Paper}>
                  <Table
                    className={classes.table}
                    aria-label="collapsible table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          No
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Name
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Student No
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Grade
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Gender
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Academic Year
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Add Mark
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Check Marks
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Edit
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Delete
                        </TableCell>
                        <TableCell
                          className={styles.tbHeaderRow}
                          align="center"
                        >
                          Parent Info
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row, index) => (
                        <Row
                          key={index}
                          row={row}
                          no={index + 1}
                          gradeNo={gradeNo}
                        />
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
              <DownloadPDF
                tableColums={tableColums}
                data={studentData}
                title={`Student List of Grade - ${gradeNo}`}
                fileName={gradeNo}
              />
            </Fragment>
          ) : (
            <DataNotFound text="No Student Yet" />
          )}
          <Modal
            open={openModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <div className={styleTwo.editForm}>
              <CreateStudent
                gradeNo={gradeNo}
                handleClose={handleClose}
              />
            </div>
          </Modal>
        </Fragment>
      )}
    </SideBarRight>
  );
}

export default StudentTable;
