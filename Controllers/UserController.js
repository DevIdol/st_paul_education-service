import UserModel from "../Models/UserModel.js";
import bcrypt from 'bcrypt'
import emailValidator from 'deep-email-validator'
import { createError } from "../Utils/CreateError.js";
import { verifyEmail } from "../Utils/VerifyEmail.js";


//Email Validation
async function isEmailValid(email) {
    return emailValidator.validate(email)
}

//create user
export const CreateUser = async (req, res, next) => {
    const { username, email, password } = req.body;
    const { valid, reason, validators } = await isEmailValid(email);
    try {
        const users = await UserModel.find();
        const user = await UserModel.findOne({ email });
        if (user) {
            return next(createError(403, "Email Already Exist."));
        }
        if (!username) {
            return next(createError(400, "Username can't be empty."));
        }
        if (!email) {
            return next(createError(400, "Eamil can't be empty."));
        }
        if (password.length < 6) {
            return next(createError(400, "Password must be at least 6 characters."));
        }
        // if (!valid) {
        //     return next(createError(400, `Invalid email address. ${validators[reason].reason}`))
        // }
        let isAdmin;
        if (!users.length) {
            isAdmin = true;
        }
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = new UserModel({
            username,
            email,
            password: hashPassword,
            isAdmin,
        });

        const savedUser = await newUser.save();
        const url = `${process.env.BASE_URL}/admin/login`;
        await verifyEmail(email, "Verify your email address", url);

        res.status(201).json({
            success: true,
            message: "Email send successfully to login.",
            data: savedUser,
        });
    } catch (error) {
        console.log(error)
        next(createError(500, "Something Went Wrong."));
    }
};

//get users
export const getUsers = async (req, res, next) => {
    try {
        const users = await UserModel.find()
        res.status(200).json({
            success: true,
            message: "Get all user successfully.",
            data: users
        })
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
}

//update user
export const updateUser = async (req, res, next) => {
    const { username, email, currentPassword, password } = req.body;
    try {
        const user = await UserModel.findById(req.params.userId)
        const isEmail = await UserModel.findOne({ email })
        if (!user) {
            return next(createError(404, "User not found."))
        }
        if (Object.keys(req.body).length === 0) {
            return next(createError(403, "Input field can't empty."))
        }
        if (!currentPassword) {
            return next(createError(403, "Required current password."))
        }
        if (isEmail) {
            return next(createError(403, "Email already exist."))
        }
        const validPass = await bcrypt.compare(
            currentPassword,
            user.password
        );
        if (!validPass) {
            return next(createError(403, "Current password is wrong."))
        }
        if (username) {
            await UserModel.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "Username change successfully."
            })
        }
        if (email) {
            await UserModel.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "Email change successfully."
            })
        }
        if (password) {
            if (password.length < 6) {
                return next(createError(400, "Password must be at least 6 characters."));
            }
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            req.body.password = await bcrypt.hash(req.body.password, salt);
            await UserModel.findByIdAndUpdate(
                req.params.userId,
                {
                    $set: req.body,
                },
                { new: true }
            );
            res.status(200).json({
                success: true,
                message: "Password change successfully."
            })
        }
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
}

//delete user
export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId)
        const isAdmin = await UserModel.find({ isAdmin: true })
        const mainAdmin = isAdmin.shift()
        if (String(mainAdmin._id) === userId) {
            return next(createError(403, "This is main admin. You can't delete."))
        }
        if (!user) {
            return next(createError(404, "User not found."))
        }
        const deleteUser = await UserModel.findByIdAndDelete(userId)
        res.status(200).json({
            success: true,
            id: deleteUser._id,
            message: `Removed ${deleteUser.username}`
        })
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
}

//get user
export const getUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId)
        if (!user) {
            return next(createError(404, "User not found."))
        }
        res.status(200).json({
            success: true,
            message: "Get user success",
            data: user
        })
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
}


//verify Admin
export const verifyAdmin = async (
    req,
    res,
    next
) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);
        const isAdmin = await UserModel.find({ isAdmin: true })
        const mainAdmin = isAdmin.shift()
        if (String(mainAdmin._id) === userId) {
            return next(createError(403, "This is main admin. You can't change."))
        }
        if (!user) {
            return next(createError(404, "User Not Found"));
        }
        if (!user.isAdmin) {
            const updateUser = await UserModel.findByIdAndUpdate(userId, { $set: { isAdmin: true } });
            res.status(200).json({
                success: true,
                message: `Now ${user.username} is Admin`,
                data: updateUser
            });
        }
        if (user.isAdmin) {
            const updateUser = await UserModel.findByIdAndUpdate(userId, {
                $set: { isAdmin: false },
            });
            res.status(200).json({
                success: true,
                message: `${user.username} is removed from admin`,
                data: updateUser
            });
        }
    } catch (error) {
        next(createError(500, "Something Went Wrong."));
    }
};