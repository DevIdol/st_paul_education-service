import passport from "passport";
import { createError } from "../Utils/CreateError.js";
import jwt from "jsonwebtoken";

//login user
export const LoginUser = async (req, res, next) => {
    passport.authenticate("login", async (err, user, info) => {
        try {
            req.login(user, { session: false }, async (error) => {
                if (!user.email || !user.password) {
                    return next(createError(403, "Invalid email or password....."))
                }
                if (err || !user) {
                    return next(createError(403, info.message));
                }
                const payload = {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    isAdmin: user.isAdmin,
                };
                const token = jwt.sign(
                    payload,
                    String(process.env.SECRET_KEY),
                    { expiresIn: "30d" }
                );
                const expiryDate = new Date(Date.now() + 30 * 24 * 36000000)
                return res.cookie("access_token", token, {
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

//logout user
export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.json({
            success: true,
            message: "Logged out successfully",
        });
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
}

