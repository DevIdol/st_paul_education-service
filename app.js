import express from 'express';
import dotenv from 'dotenv';
import ConnectDB from './db.js';
import userAuthRoute from './Routes/UserAuthRoute.js';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import './Config/UserPassport.js';
import './Config/StudentPassport.js';
import { ErrorHandler } from './Middlewares/ErrorHandler.js';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import userRoute from './Routes/UserRoute.js';
import studentRoute from './Routes/StudentRoute.js';
import markRoute from './Routes/MarkRoute.js';
import visitorRoute from './Routes/VisitorRoute.js';
import studentAuthRoute from './Routes/StudentAuthRoute.js';


const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
app.use(passport.initialize())


//db
ConnectDB();

//route api
app.use('/api/v1/auth', userAuthRoute)
app.use('/api/v1/auth/students', studentAuthRoute)
app.use('/api/v1/users', userRoute)
app.use('/api/v1/students', studentRoute)
app.use('/api/v1/marks', markRoute)
app.use('/api/v1/visitor', visitorRoute)


//error handler
app.use(ErrorHandler)

app.use(express.static(path.join(__dirname, './Client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './Client/build/index.html'), function (err) {
        res.status(500).send(err)
    })
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

export default app;