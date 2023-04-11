import express from 'express'
import { LoginStudent, logoutStudent } from '../Controllers/StudentAuthController.js';

const studentAuthRoute = express.Router()


studentAuthRoute.post('/login', LoginStudent)

studentAuthRoute.post('/logout', logoutStudent)


export default studentAuthRoute;