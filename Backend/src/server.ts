import express, { Request, Response } from 'express';
import userRoute from './routes/userRoutes'
import ConnectDB from './config/database';
const mongoose = require('mongoose')
import tutorRoute from './routes/tutorRoutes'

import { errorHandler } from './helper/errorHandleMiddleware';

import dotenv from 'dotenv'
const cors = require('cors')

dotenv.config()

const PORT = process.env.PORT || 7001

ConnectDB()

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173', 
    optionsSuccessStatus: 200
  };

app.use(express.json())
app.use(cors(corsOptions))
app.use('/' ,userRoute)
app.use('/tutor',tutorRoute)

app.use(errorHandler)

// Routes



app.listen(PORT, () => {
    console.log("Server running peacefully on" ,PORT);   
})

