import express, { Application, Request, Response, NextFunction } from 'express';
import userRoute from './routes/userRoutes';
import tutorRoute from './routes/tutorRoutes';
import adminRoute from './routes/adminRoutes';
import commuintyRote from './routes/communityRoutes';
import ConnectDB from './config/database';
import { errorHandler } from './helper/errorHandleMiddleware';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { configSocketIO } from './config/socketConfig';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import * as rfs from 'rotating-file-stream';
import path from 'path';
import { asyncContextMiddleware } from './config/awsFileConfigs';
import fs from 'fs';

dotenv.config();
const PORT = process.env.PORT || 7000;
ConnectDB();
const app: Application = express();
const server = createServer(app);
configSocketIO(server);
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const errorLogStream = rfs.createStream('error.log', {
  interval: '1d',     
  path: logDirectory,
  maxFiles: 7,        
});
app.use(
  morgan('combined', {
    stream: errorLogStream,
    skip: (req: Request, res: Response) => res.statusCode < 400, 
  })
);
console.log(process.env.BASE_URL);
app.use(cors({
  origin: ["https://learnsphere.kevinhills.shop", 'http://localhost:5173'],
  credentials: true,
}));
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
app.use(asyncContextMiddleware);
app.use(cookieParser());
app.use(express.json({ limit: '5gb' }));
app.use(express.urlencoded({ limit: '5gb', extended: true }));
app.use('/', userRoute);
app.use('/tutor', tutorRoute);
app.use('/admin', adminRoute);
app.use('/community', commuintyRote);

app.use(errorHandler);

// app.get('/test-error', (req, res) => {
//     res.status(500).send('This is a test error');
//   });
  
server.listen(PORT, () => {
  console.log("Server running peacefully on", PORT);
});
