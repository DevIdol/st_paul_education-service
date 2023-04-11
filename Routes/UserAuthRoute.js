import express from 'express'
import { LoginUser, logoutUser } from '../Controllers/UserAuthController.js';

const userAuthRoute = express.Router()


userAuthRoute.post('/login', LoginUser)

userAuthRoute.post('/logout', logoutUser)


export default userAuthRoute;