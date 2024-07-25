import express, { Request, Response } from 'express';
import userRoute from './routes/userRoutes'
import ConnectDB from './config/database';
const mongoose = require('mongoose')
// const user = require('../src/Modules/User/routes')

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

// Routes



app.listen(PORT, () => {
    console.log("Server running peacefully");   
})

