import passport from "passport";
import passportLocal from 'passport-local'
import passportJWT from 'passport-jwt'
import { createError } from "../Utils/CreateError.js";
import UserModel from "../Models/UserModel.js";
import dotenv from 'dotenv'

dotenv.config()
const localStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;

passport.use(
    "login",
    new localStrategy({
        usernameField: "email",
        passwordField: "password",
    },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email })
                if (!user) {
                    return done(null, false, { message: "Invalid email or password...." })
                }
                const isPassword = await user.isValidPassword(password);
                if (!isPassword) {
                    return done(null, false, { message: "Invalid email or password....." })
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
        jwt = req.cookies("access_token")
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