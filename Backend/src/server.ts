import express, { Request, Response } from 'express';
import multer from 'multer';
import userRoute from './routes/userRoutes';
import tutorRoute from './routes/tutorRoutes';
import adminRoute from './routes/adminRoutes';
import ConnectDB from './config/database';
import { errorHandler } from './helper/errorHandleMiddleware';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const PORT = process.env.PORT || 7001;

ConnectDB();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};





app.use(express.json({ limit: '5gb' })); 
app.use(express.urlencoded({ limit: '5gb', extended: true })); 
app.use(cors(corsOptions));
app.use('/' , userRoute);
app.use('/tutor', tutorRoute);
app.use('/admin', adminRoute);




app.use(errorHandler);

app.listen(PORT, () => {
    console.log("Server running peacefully on", PORT);
});
