import express from 'express';
import cors from "cors";
import 'dotenv/config'
import cookie from "cookie-parser";
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from "./routes/authRoutes.js";
import userRouter from './routes/userRoutes.js';

const app = express()
const port = process.env.PORT || 4000
connectDB();

const allowedOrigins = ['http://localhost:5173']

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: "https://mern-auth-app-frontend-kbwq.onrender.com", credentials: true}))

//app.use('/', require('./routes/authRoutes'))

//API Endpoints

app.get('/', (req, res) => res.send ("API Working"));
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}!!!`)
})

