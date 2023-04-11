import { createError } from "../Utils/CreateError.js";
import MarkModel from "../Models/MarkModel.js";
import StudentModel from "../Models/StudentModel.js";

//calculate mark
function calculateRemark(mark) {
    if (mark >= 85 && mark <= 100) {
        return "A";
    } else if (mark >= 65 && mark <= 84) {
        return "B";
    } else if (mark >= 45 && mark <= 64) {
        return "C";
    } else {
        return "D";
    }
}

//create marks
export const createMark = async (req, res, next) => {
    const { subjects, month, attendance } = req.body;
    const totalMark = subjects.reduce((acc, subject) => acc + Number(subject.mark), 0);
    const average = (totalMark / subjects.length).toFixed(0);
    try {
        const studentId = req.params.studentId;
        let student = await StudentModel.findById(studentId);
        if (!student) {
            return next(createError(404, "Student not found."));
        }
        if (!subjects || subjects.length === 0) {
            return next(createError(400, "Required subject name and mark."));
        }
        if (!month) {
            return next(createError(400, "Required month."));
        }
        if (!attendance) {
            return next(createError(400, "Required Attendance."));
        }
        const currentYear = new Date().getFullYear();

        const existingRecord = await MarkModel.findOne({
            studentId,
            month,
            year: currentYear,
        });

        if (existingRecord) {
            return next(
                createError(
                    403,
                    "This month is already exist for this student in this year."
                )
            );
        }
        const subjectNames = subjects.map((subject) => subject.name);
        if (new Set(subjectNames).size !== subjectNames.length) {
            return next(createError(403, "Subject name must be unique."));
        }


        const newMark = new MarkModel({
            studentId,
            subjects: subjects.map((subject) => ({
                name: subject.name,
                mark: subject.mark,
                remark: calculateRemark(subject.mark),
            })),
            totalMark,
            average,
            averageRemark: calculateRemark(average),
            month,
            attendance
        });
        console.log(average)
        const savedMark = await newMark.save();
        student.marks.push(savedMark);
        const savedStudent = await student.save();
        await savedStudent.populate("marks");
        res.status(201).json({
            success: true,
            message: `Added Marks Of ${student.name}`,
            data: savedMark,
        });
    } catch (error) {
        console.log(error)
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};


//get marks
export const getMarks = async (req, res, next) => {
    try {
        const grade = req.query.grade;
        const month = req.query.month;
        if (grade && month) {
            const students = await StudentModel.find({ grade }).populate("marks");
            const studentInfo = students
                .map((student) => {
                    const studentMarks = student.marks.filter((m) => m.month === month);
                    if (studentMarks.length > 0) {
                        return {
                            studentId: student._id,
                            markId: studentMarks[0]._id,
                            name: student.name,
                            studentNo: student.studentNo,
                            grade: student.grade,
                            subjects: studentMarks[0].subjects,
                            month: studentMarks[0].month,
                            year: studentMarks[0].year,
                            attendance: studentMarks[0].attendance,
                            average: studentMarks[0].average,
                            averageRemark: studentMarks[0].averageRemark,
                            totalMark: studentMarks[0].totalMark,
                        };
                    } else {
                        return;
                    }
                })
                .filter((info) => info !== undefined);
            if (studentInfo.length > 0) {
                res.status(200).json({
                    success: true,
                    message: "Get all student with marks",
                    data: studentInfo,
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "This result not found in this month",
                    data: studentInfo,
                });
            }
        } else {
            return next(createError(404, "Marks not found."));
        }
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};

//get mark
export const getMark = async (req, res, next) => {
    try {
        const markId = req.params.markId;
        const mark = await MarkModel.findById(markId)
        const studentInfo = {
            ...mark.toObject(),
            ...(await StudentModel.findById(mark.studentId)).toObject(),
        };
        res.status(200).json({
            success: true,
            message: "Get mark",
            data: studentInfo
        })
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
}

//get mark
export const getStudentMark = async (req, res, next) => {
    try {
        const studentId = req.params.studentId;
        const mark = await MarkModel.find({ studentId })
        res.status(200).json({
            success: true,
            message: "Get mark",
            data: mark
        })
    } catch (error) {
        console.log(error)
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
}

//update mark
export const updateMark = async (req, res, next) => {
    const { subjects, month, attendance } = req.body;
    const totalMark = subjects.reduce((acc, subject) => acc + Number(subject.mark), 0);
    const average = (totalMark / subjects.length).toFixed(0);
    try {
        const studentId = req.params.studentId;
        const markId = req.params.markId;
        let student = await StudentModel.findById(studentId);
        if (!student) {
            return next(createError(404, "Student not found."));
        }
        if (!markId) {
            return next(createError(404, "Marks not found."));
        }
        if (!subjects || subjects.length === 0) {
            return next(createError(400, "Required subject name and mark."));
        }
        if (!month) {
            return next(createError(400, "Required month."));
        }
        if (!attendance) {
            return next(createError(400, "Required Attendance."));
        }
        // const year = new Date().getFullYear();
        // const isMonth = await MarkModel.exists({ _id: { $ne: markId }, year, month });
        // if (isMonth) {
        //     return next(createError(403, "This month is already exist for this student in this year."));
        // }
        const currentYear = new Date().getFullYear();

        const existingRecord = await MarkModel.findOne({
            studentId,
            month,
            year: currentYear,
        });

        if (existingRecord) {
            return next(
                createError(
                    403,
                    "This month is already exist for this student in this year."
                )
            );
        }
        const subjectNames = subjects.map((subject) => subject.name);
        if (new Set(subjectNames).size !== subjectNames.length) {
            return next(createError(403, "Subject name must be unique."));
        }
        const body = {
            subjects: subjects.map((subject) => ({
                name: subject.name,
                mark: subject.mark,
                remark: calculateRemark(subject.mark),
            })),
            totalMark,
            average,
            averageRemark: calculateRemark(average),
            month,
            attendance,
        };
        const updatedMark = await MarkModel.findByIdAndUpdate(
            markId,
            { $set: body },
            { new: true }
        );
        res.status(200).json({
            success: true,
            message: `Updated Mark Of ${student.name}`,
            data: updatedMark,
        });
    } catch (error) {
        console.log(error);
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};

//delete mark
export const deleteMark = async (req, res, next) => {
    const markId = req.params.markId;
    try {
        const mark = await MarkModel.findByIdAndDelete(markId);
        const student = await StudentModel.findById(mark.studentId);
        student.marks = student.marks.filter((m) => String(m) !== markId);
        student.save();
        res.status(200).json({
            success: true,
            message: `${student.name}'s the mark of ${mark.month} has been deleted.`,
        });
    } catch (error) {
        next(createError(500, error._message ?? "Something Went Wrong"));
    }
};
