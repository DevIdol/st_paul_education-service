import express from 'express'
import { verifyAdmin, deleteUser, getUsers, getUser, updateUser, CreateUser } from '../Controllers/UserController.js';

const userRoute = express.Router()

//create user
userRoute.post('/create', CreateUser)

//get users
userRoute.get("/", getUsers)

//update user
userRoute.put('/:userId', updateUser)

//delete user 
userRoute.delete('/:userId', deleteUser)

//get user
userRoute.get('/:userId', getUser)

//verify amdin
userRoute.put('/verify-admin/:userId', verifyAdmin)

export default userRoute;