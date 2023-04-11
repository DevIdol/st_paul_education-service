import MarkModel from "../Models/MarkModel.js";
import StudentModel from "../Models/StudentModel.js";
import { createError } from "../Utils/CreateError.js";

//create student
export const createStudent = async (req, res, next) => {
    const { name, studentNo, grade, gender, academicYear, parentInfo } = req.body;
    const regex = /[^a-zA-Z]/;
    try {
        if (!name) {
            return next(createError(400, "Required student name."));
        }
        if (!studentNo) {
            return next(createError(400, "Required student number."));
        }
        if (!grade) {
            return next(createError(400, "Required student grade."));
        }
        if (!gender) {
            return next(createError(400, "Required student gender."));
        }
        if (!academicYear) {
            return next(createError(400, "Required academic year."));
        }
        if (!regex.test(academicYear)) {
            return next(createError(400, "Required academic year."));
        }
        if (!parentInfo.fatherName || !parentInfo.motherName || !parentInfo.phNo || !parentInfo.address) {
            return next(createError(400, "Some Missing in Parent Info"))
        }

        const student = await StudentModel.findOne({ studentNo });
        if (student) {
            return next(createError(403, "Already exist student number."));
        }
        const newStudent = new StudentModel({
            name,
            studentNo,
            grade,
            gender,
            academicYear,
            parentInfo: {
                fatherName: parentInfo.fatherName,
                motherName: parentInfo.motherName,
                phNo: parentInfo.phNo,
                address: parentInfo.address
            }
        });
        const firstChar = studentNo[0];
        if (grade != firstChar) {
            return next(createError(403, "Student no and grade are not match."));
        }
        const savedStudent = await newStudent.save();
        res.status(201).json({
            success: true,
            message: `Added New Student ${name}`,
            data: savedStudent,
        });
    } catch (error) {
        console.log(error)
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};

//get students
export const getStudents = async (req, res, next) => {
    const grade = req.query.grade;

    try {
        let students;
        if (grade) {
            students = await StudentModel.find({ grade: grade })
                .populate("marks")
                .exec();
        } else {
            students = await StudentModel.find().populate("marks").exec();
        }
        res.status(200).json({
            success: true,
            message: "Get student with grade",
            data: students,
        });
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};

//get student
export const getStudent = async (req, res, next) => {
    try {
        const student = await StudentModel.findById(req.params.studentId);
        if (!student) {
            return next(createError(404, "Student not found."));
        }
        res.status(200).json({
            success: true,
            message: "Get student successfully",
            data: student,
        });
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};

//update student
export const updateStudent = async (req, res, next) => {
    const { name, studentNo, grade, gender, academicYear } = req.body;

    try {
        if (!name) {
            return next(createError(403, "Student name can't empty."));
        }
        if (!studentNo) {
            return next(createError(403, "Student number can't empty."));
        }
        if (!grade) {
            return next(createError(403, "Student grade can't empty."));
        }
        if (!gender) {
            return next(createError(403, "Student gender can't empty."));
        }
        if (!academicYear) {
            return next(createError(403, "Student academic year can't empty."));
        }
        const firstChar = studentNo[0];
        if (grade != firstChar) {
            return next(createError(403, "Student no and grade are not match."));
        }
        const student = await StudentModel.findById(req.params.studentId);
        if (!student) {
            return next(createError(404, "Student not found."));
        }
        const studentNum = await StudentModel.findOne({ studentNo });
        if (studentNum) {
            return next(createError(403, "Already exist student number."));
        }
        const updatedStudent = await StudentModel.findByIdAndUpdate(
            req.params.studentId,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: `Updated ${student.name}'s info`,
            data: updatedStudent,
        });
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};

//delete student
export const deleteStudent = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;
        const student = await StudentModel.findById(studentId);
        if (!student) {
            return next(createError(404, "Student not found."));
        }
        const deletedStudent = await StudentModel.findByIdAndDelete(
            studentId
        ).populate("marks");

        await MarkModel.deleteMany({ studentId });
        res.status(200).json({
            success: true,
            message: `Deleted ${deletedStudent.name} and ${deletedStudent.gender == "Male" ? "his" : "her"
                } ${deletedStudent.gender == "Other" && "him/his"}Marks`,
        });
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};
