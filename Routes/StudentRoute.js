import express from 'express'
import { createStudent, deleteStudent, getStudent, getStudents, updateStudent } from '../Controllers/StudentContorller.js';


const studentRoute = express.Router()

//create student
studentRoute.post('/create', createStudent)

//get all students
studentRoute.get('/', getStudents)

//get student
studentRoute.get('/:studentId', getStudent)

//update student
studentRoute.put('/:studentId', updateStudent)

//delete student
studentRoute.delete('/:studentId', deleteStudent)

export default studentRoute;