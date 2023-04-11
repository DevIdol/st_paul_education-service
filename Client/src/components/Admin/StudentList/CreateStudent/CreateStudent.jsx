import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStudent } from "../../../../Redux/Student/StudentSice";
import styles from "./StudentForm.module.css";
import { useNavigate } from "react-router-dom";
import Input from "../../../../View/Input";
import InputSelect from "../../../../View/InputSelect";
import Button from "../../../../View/Button";

const CreateStudent = ({ handleClose, gradeNo }) => {
  const navigate = useNavigate();
  const [academicYears, setAcademicYears] = useState([]);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.students);

  const [studentData, setStudentData] = useState({
    name: "",
    studentNo: "",
    grade: "",
    gender: "",
    academicYear: "",
    fatherName: "",
    motherName: "",
    phNo: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({
      ...studentData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newStudent = {
      name: studentData.name,
      studentNo: studentData.studentNo,
      grade: studentData.grade,
      gender: studentData.gender,
      academicYear: studentData.academicYear,
      parentInfo: {
        fatherName: studentData.fatherName,
        motherName: studentData.motherName,
        phNo: studentData.phNo,
        address: studentData.address,
      },
    };
    dispatch(createStudent(newStudent));
    if (!error) {
      if (Object.values(newStudent).every((value) => value !== "")) {
        navigate(`/admin/students?grade=${newStudent.grade}`);
        handleClose(e);
      }
    } else {
      if (newStudent.grade) {
        navigate(`/admin/students?grade=${newStudent.grade}`);
      } else {
        navigate(`/admin/students?grade=${gradeNo}`);
      }
    }
  };

  useEffect(() => {
    const nowYear = new Date().getFullYear();
    const currentYear = nowYear - 1;
    const nextYear = currentYear + 1;
    const academicYearsList = [];
    for (let i = currentYear; i <= nextYear; i++) {
      academicYearsList.push(`${i}-${i + 1}`);
    }
    setAcademicYears(academicYearsList);
  }, []);

  return (
    <Fragment>
      <form onSubmit={handleSubmit} className={styles.studentForm}>
        <h3 className={styles.title}>Add New Student</h3>
        <div className={styles.firstGP}>
          <Input
            type="text"
            name="name"
            value={studentData.name}
            onChange={handleChange}
            placeholder="Student Name"
          />
          <Input
            type="text"
            name="studentNo"
            value={studentData.studentNo}
            onChange={handleChange}
            placeholder="Student No"
          />
        </div>
        <div className={styles.secondGP}>
          <InputSelect
            className={styles.selectOption}
            name="grade"
            value={studentData.grade}
            onChange={handleChange}
          >
            <option className={styles.firstOption} value="---Select Grade---">
              Select Grade
            </option>
            <option value={1}>Grade - 1</option>
            <option value={2}>Grade - 2</option>
            <option value={3}>Grade - 3</option>
            <option value={4}>Grade - 4</option>
            <option value={5}>Grade - 5</option>
            <option value={6}>Grade - 6</option>
            <option value={7}>Grade - 7</option>
            <option value={8}>Grade - 8</option>
          </InputSelect>
          <InputSelect
            className={styles.selectOption}
            name="gender"
            value={studentData.gender}
            onChange={handleChange}
          >
            <option className={styles.firstOption} value="---Select Gender---">
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </InputSelect>
        </div>
        <div>
        <InputSelect
          name="academicYear"
          value={studentData.academicYear}
          onChange={handleChange}
          className={styles.selectOption}
        >
          <option value="Academic Year">Academic Year</option>
          {academicYears.map((year) => (
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
            value={studentData.fatherName}
            onChange={handleChange}
            placeholder="Father Name"
          />
          <Input
            type="text"
            name="motherName"
            value={studentData.motherName}
            onChange={handleChange}
            placeholder="Mother Name"
          />
        </div>
        <div className={styles.firstGP}>
          <Input
            type="number"
            name="phNo"
            maxlength="12"
            value={studentData.phNo}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <Input
            type="text"
            name="address"
            value={studentData.address}
            onChange={handleChange}
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
            text="Add"
          />
        </div>
      </form>
    </Fragment>
  );
};

export default CreateStudent;
