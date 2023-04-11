import express from 'express'
import { getVisitor } from '../Controllers/VisitorController.js'
const visitorRoute = express.Router()

visitorRoute.get('/', getVisitor)

export default visitorRoute
