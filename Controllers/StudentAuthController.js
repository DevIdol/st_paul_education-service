
import passport from "passport";
import { createError } from "../Utils/CreateError.js";
import jwt from "jsonwebtoken";

//login student
export const LoginStudent = async (req, res, next) => {
    passport.authenticate("studentlogin", async (err, user, info) => {
        try {
            req.login(user, { session: false }, async (error) => {
                if (!user.name || !user.studentNo) {
                    return next(createError(403, "Invalid Name or Student Number."))
                }
                if (err || !user) {
                    return next(createError(403, info.message));
                }
                const payload = {
                    _id: user._id,
                    name: user.name,
                    studentNo: user.studentNo,
                    grade: user.grade,
                    gender: user.gender,
                    academicyear: user.academicyear,
                    marks: user.marks
                };
                const token = jwt.sign(
                    payload,
                    String(process.env.SECRET_KEY),
                    { expiresIn: "30d" }
                );
                const expiryDate = new Date(Date.now() + 30 * 24 * 36000000)
                return res.cookie("student_access_token", token, {
                    expires: expiryDate,
                    httpOnly: true,
                }).status(200).json({
                    success: true,
                    message: info.message,
                    token,
                })
            })
        } catch (error) {
            next(createError(500, "Something Went Wrong."));
        }
    })(req, res, next)
};

//logout student
export const logoutStudent = async (req, res, next) => {
    try {
        res.clearCookie("student_access_token");
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
}