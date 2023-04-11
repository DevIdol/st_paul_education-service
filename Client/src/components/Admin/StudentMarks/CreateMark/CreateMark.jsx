import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SideBarRight from "../../../../View/SideBarRight";
import { createMarks, getMarks } from "../../../../Redux/Mark/MarkSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Input from "../../../../View/Input";
import Button from "../../../../View/Button";
import { MdOutlineRemoveCircle, MdAddCircle } from "react-icons/md";
import InputSelect from "../../../../View/InputSelect";
import { Tooltip } from "@material-ui/core";
import styles from "./CreateMark.module.css";
import { getStudent } from "../../../../Redux/Student/StudentSice";
import TabelHeader from "../../TableHeader";
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
const currentMonth = months[new Date().getMonth()];
export default function CreateMark() {
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState([{ name: "", mark: "" }]);
  const [month, setMonth] = useState(currentMonth);
  const [attendance, setAttendance] = useState("");
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const grade = new URLSearchParams(location.search).get("grade");
  useEffect(() => {
    dispatch(getStudent(studentId));
  }, [dispatch, studentId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const markData = {
      subjects,
      month,
      attendance,
    };
    dispatch(getMarks(grade));
    dispatch(createMarks({ id: studentId, markData }));
    setSubjects([{ name: "", mark: "" }]);
    setMonth(currentMonth);
    setAttendance("");
    navigate(-1);
  };

  const handleSubjectChange = (index, event) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][event.target.name] = event.target.value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", mark: "" }]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects.splice(index, 1);
    setSubjects(updatedSubjects);
  };

  const handleAttendanceChange = (event) => {
    setAttendance(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const { student } = useSelector((state) => state.students);

  return (
    <SideBarRight>
      <TabelHeader title={`Add Mark Of ${student.name}`} />
      <form onSubmit={handleSubmit}>
        <div className={styles.addSubWrapper}>
          {subjects.map((subject, index) => (
            <div key={index} className={styles.addSubject}>
              <Input
                type="text"
                placeholder="Subject Name"
                name="name"
                value={subject.name}
                onChange={(event) => handleSubjectChange(index, event)}
              />
              <InputSelect
                placeholder="Mark"
                name="mark"
                value={subject.mark}
                onChange={(event) => handleSubjectChange(index, event)}
              >
                <option value="Select Mark">Select Mark</option>
                {[...Array(101)].map((_, i) => (
                  <option key={i} value={100 - i}>
                    {100 - i}
                  </option>
                ))}
              </InputSelect>
              <Tooltip
                title="Remove Subject and Mark Input"
                onClick={() => handleRemoveSubject(index)}
                arrow
                placement="top"
                className={styles.removeIcon}
              >
                <span>
                  <MdOutlineRemoveCircle size={26} />
                </span>
              </Tooltip>
            </div>
          ))}
        </div>

        <Tooltip
          title="Add Subject and Mark Input"
          onClick={handleAddSubject}
          placement="right"
          arrow
        >
          <span>
            <MdAddCircle className={styles.addIcon} size={26} />
          </span>
        </Tooltip>
        <div className={styles.montAtten}>
          <InputSelect value={month} onChange={handleMonthChange}>
            {Array.from({ length: 12 }, (_, i) => {
              const month = new Date(0, i).toLocaleString("default", {
                month: "long",
              });
              return (
                <option value={month} key={i}>
                  {month}
                </option>
              );
            })}
          </InputSelect>
          <InputSelect
            type="number"
            placeholder="Attendance"
            value={attendance}
            onChange={handleAttendanceChange}
          >
            <option value="Select Attendance">Select Attendance</option>
            {[...Array(101)].map((_, i) => (
              <option key={i} value={100 - i}>
                {100 - i}%
              </option>
            ))}
          </InputSelect>
        </div>
        <div>
          <Button className={styles.submitBtn} type="submit" text="Saved" />
        </div>
      </form>
    </SideBarRight>
  );
}
