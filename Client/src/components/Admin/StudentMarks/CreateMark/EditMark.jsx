import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMark, updateMark } from "../../../../Redux/Mark/MarkSlice";
import Input from "../../../../View/Input";
import styles from "./CreateMark.module.css";
import InputSelect from "../../../../View/InputSelect";
import { Tooltip } from "@material-ui/core";
import { MdAddCircle, MdOutlineRemoveCircle } from "react-icons/md";
import TabelHeader from "../../TableHeader";
import Button from "../../../../View/Button";
import SideBarRight from "../../../../View/SideBarRight";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../Loading/Loading";
const MONTH_NAMES = [
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

const EditMark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { markId } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [month, setMonth] = useState("");
  const [attendance, setAttendance] = useState("");

  const { mark, loading } = useSelector((state) => state.marks);

  useEffect(() => {
    dispatch(getMark(markId));
  }, [dispatch, markId]);

  useEffect(() => {
    if (mark) {
      setSubjects(mark.subjects);
      setMonth(mark.month);
      setAttendance(mark.attendance);
    }
  }, [mark]);

  const handleSubjectChange = (index, event) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = {
      ...updatedSubjects[index],
      [event.target.name]: event.target.value,
    };
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
  const handleSubmit = (e) => {
    e.preventDefault();
    const markData = { subjects, month, attendance };
    dispatch(updateMark({ markId, studentId: mark.studentId, markData }));
    navigate(-1)
  };

  return (
    <SideBarRight>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <TabelHeader title={`Edit Marks Of ${mark.name}`} />
          <div className={styles.addSubWrapper}>
            {subjects?.map((subject, index) => (
              <div key={index} className={styles.addSubject}>
                <Input
                  type="text"
                  name="name"
                  placeholder="Subject"
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
                    <MdOutlineRemoveCircle />
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
            <InputSelect
              value={month}
              onChange={(event) => setMonth(event.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => i).map((index) => (
                <option key={index} value={MONTH_NAMES[index]}>
                  {MONTH_NAMES[index]}
                </option>
              ))}
            </InputSelect>
            <InputSelect
              type="number"
              placeholder="Attendance"
              value={attendance}
              onChange={(event) => setAttendance(event.target.value)}
            >
              {[...Array(101)].map((_, i) => (
                <option key={i} value={100 - i}>
                  {100 - i}%
                </option>
              ))}
            </InputSelect>
          </div>
          <Button className={styles.submitBtn} type="submit" text="Saved" />
        </form>
      )}
    </SideBarRight>
  );
};

export default EditMark;
