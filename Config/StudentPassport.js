import passport from "passport";
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import StudentModal from '../Models/StudentModel.js'
import { createError } from "../Utils/CreateError.js";
import dotenv from 'dotenv'

dotenv.config()
const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
    "studentlogin",
    new localStrategy({
        usernameField: "name",
        passwordField: "studentNo",
    },
        async (name, studentNo, done) => {
            try {
                const user = await StudentModal.findOne({ name, studentNo })
                if (!user) {
                    return done(null, false, { message: "Invalid Name or Student Number." })
                }
                return done(null, user, { message: "Logged in successfully." })
            } catch (error) {
                return done(createError(500, "Internal Server Error."))
            }
        }
    )
)

const cookieExtractor = (req) => {
    let jwt = null;
    if (req && req.cookies) {
        jwt = req.cookies("student_access_token")
    }
    return jwt;
}

passport.use(
    new JWTStrategy(
        {
            secretOrKey: String(process.env.SECRET_KEY),
            jwtFromRequest: cookieExtractor
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(createError(401, "You are not authorized."))
            }
        }
    )
)