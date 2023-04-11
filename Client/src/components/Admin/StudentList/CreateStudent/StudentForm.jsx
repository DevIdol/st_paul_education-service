import React, { useEffect, useState } from "react";
import SideBarRight from "../../../../View/SideBarRight";
import SideBarRightTitle from "../../SideBarRightTitle";
import Input from "../../../../View/Input";
import styles from "./StudentForm.module.css";
import InputSelect from "../../../../View/InputSelect";
import Button from "../../../../View/Button";

const StudentForm = ({
  title,
  value,
  parentInfo,
  onChange,
  loading,
  onSubmit,
}) => {
  const [academicYears, setAcademicYears] = useState([]);

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
    <SideBarRight className={styles.createStudent}>
      <SideBarRightTitle title={title} />
      <form onSubmit={onSubmit} className={styles.studentForm}>
        <div className={styles.firstGP}>
          <Input
            type="text"
            name="name"
            value={value.name}
            onChange={onChange}
            placeholder="Student Name"
          />
          <Input
            type="text"
            name="studentNo"
            value={value.studentNo}
            onChange={onChange}
            placeholder="Student No"
          />
        </div>
        <div className={styles.secondGP}>
          <InputSelect
            className={styles.selectOption}
            name="grade"
            value={value.grade}
            onChange={onChange}
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
            value={value.gender}
            onChange={onChange}
          >
            <option className={styles.firstOption} value="---Select Gender---">
              Select Gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </InputSelect>
          <InputSelect
            name="academicYear"
            value={value.academicYear}
            onChange={onChange}
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
            value={value.fatherName}
            onChange={onChange}
            placeholder="Father Name"
          />
          <Input
            type="text"
            name="motherName"
            value={value.motherName}
            onChange={onChange}
            placeholder="Mother Name"
          />
        </div>
        <div className={styles.firstGP}>
          <Input
            type="number"
            name="phNo"
            maxlength="12"
            value={value.phNo}
            onChange={onChange}
            placeholder="Phone Number"
          />
          <Input
            type="text"
            name="address"
            value={value.address}
            onChange={onChange}
            placeholder="Address"
          />
        </div>
        <Button
          className={styles.submitBtn}
          loading={loading}
          type="submit"
          text="Add"
        />
      </form>
    </SideBarRight>
  );
};

export default StudentForm;
