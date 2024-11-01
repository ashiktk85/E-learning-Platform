import express, { Application, Request, Response } from 'express';
import userRoute from './routes/userRoutes';
import tutorRoute from './routes/tutorRoutes';
import adminRoute from './routes/adminRoutes';
import commuintyRote from './routes/communityRoutes'

import ConnectDB from './config/database';
import { errorHandler } from './helper/errorHandleMiddleware';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http'
import { configSocketIO } from './config/socketConfig';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import { asyncContextMiddleware } from './config/awsFileConfigs';

dotenv.config();

const PORT = process.env.PORT || 7000;

ConnectDB();

const app : Application = express();
const server = createServer(app)

configSocketIO(server)

app.use(morgan('dev'));
console.log(process.env.BASE_URL);

const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
    // optionsSuccessStatus: 200
};

app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    next();
  });

  app.use(asyncContextMiddleware);
  
app.use(cookieParser());
app.use(express.json({ limit: '5gb' })); 
app.use(express.urlencoded({ limit: '5gb', extended: true })); 
app.use(cors(corsOptions));
app.use('/' , userRoute);
app.use('/tutor', tutorRoute);
app.use('/admin', adminRoute);
app.use('/community' , commuintyRote)

app.use(errorHandler);

server.listen(PORT, () => {
    console.log("Server running peacefully on", PORT);
});
