import express from 'express'
import { createMark, deleteMark, getMark, getMarks, getStudentMark, updateMark } from '../Controllers/MarkController.js';


const markRoute = express.Router()

markRoute.post('/create/:studentId', createMark)

markRoute.get('/students', getMarks)

markRoute.get('/:markId', getMark)

markRoute.get('/students/:studentId', getStudentMark)

markRoute.put('/:markId/:studentId', updateMark)

markRoute.delete('/:markId', deleteMark);

export default markRoute;