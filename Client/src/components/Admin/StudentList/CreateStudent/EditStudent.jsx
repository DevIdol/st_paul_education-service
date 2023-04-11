import React, { Fragment, useEffect, useState } from "react";
import Input from "../../../../View/Input";
import { useDispatch, useSelector } from "react-redux";
import styles from "./StudentForm.module.css";
import InputSelect from "../../../../View/InputSelect";
import Button from "../../../../View/Button";
import { updateStudent } from "../../../../Redux/Student/StudentSice";

const EditStudent = ({ studentId, handleClose }) => {
  const dispatch = useDispatch();
  const student = useSelector((state) =>
    state.students.students.find((student) => student._id === studentId)
  );
  const { loading } = useSelector((state) => state.students);
  const [name, setName] = useState(student.name);
  const [studentNo, setStudentNo] = useState(student.studentNo);
  const [grade, setGrade] = useState(student.grade);
  const [gender, setGender] = useState(student.gender);
  const [academicYear, setAcademicYear] = useState(student.academicYear);
  const [acYear, setAcYear] = useState([]);
  const [fatherName, setFatherName] = useState(student.parentInfo.fatherName);
  const [motherName, setMotherName] = useState(student.parentInfo.motherName);
  const [phNo, setPhNo] = useState(student.parentInfo.phNo);
  const [address, setAddress] = useState(student.parentInfo.address);

  useEffect(() => {
    const nowYear = new Date().getFullYear();
    const currentYear = nowYear - 1;
    const nextYear = currentYear + 1;
    const acYearList = [];
    for (let i = currentYear; i <= nextYear; i++) {
      acYearList.push(`${i}-${i + 1}`);
    }
    setAcYear(acYearList);
  }, []);

  const updatedStudent = {
    name,
    studentNo,
    grade,
    gender,
    academicYear,
    parentInfo: {
      fatherName,
      motherName,
      phNo,
      address,
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateStudent(studentId, updatedStudent));
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={styles.studentForm}>
        <h3 className={styles.title}>Edit {student.name}'s Info</h3>

        <div className={styles.firstGP}>
          <Input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Student Name"
          />
          <Input
            type="text"
            name="studentNo"
            value={studentNo}
            onChange={(e) => setStudentNo(e.target.value)}
            placeholder="Student No"
          />
        </div>
        <div className={styles.secondGP}>
          <InputSelect
            name="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="1">Grade - 1</option>
            <option value="2">Grade - 2</option>
            <option value="3">Grade - 3</option>
            <option value="4">Grade - 4</option>
            <option value="5">Grade - 5</option>
            <option value="6">Grade - 6</option>
            <option value="7">Grade - 7</option>
            <option value="8">Grade - 8</option>
          </InputSelect>
          <InputSelect
            name="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </InputSelect>
          <InputSelect
            name="academicYear"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
          >
            {acYear.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </InputSelect>
        </div>
        <div className={styles.firstGP}>
          <Input
            type="text"
            name="fatherName"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
            placeholder="Father Name"
          />
          <Input
            type="text"
            name="motherName"
            value={motherName}
            onChange={(e) => setMotherName(e.target.value)}
            placeholder="Mother Name"
          />
        </div>
        <div className={styles.firstGP}>
          <Input
            type="number"
            name="phNo"
            maxlength="12"
            value={phNo}
            onChange={(e) => setPhNo(e.target.value)}
            placeholder="Phone Number"
          />
          <Input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
        </div>
        <div className={styles.btn}>
          <Button
            onClick={handleClose}
            className={styles.cancelBtn}
            type="text"
            text="Cancel"
          />
          <Button
            className={styles.submitBtn}
            loading={loading}
            type="submit"
            text="Save"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default EditStudent;
