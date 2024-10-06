

import { Request, Response, NextFunction } from "express";

import HTTP_statusCode from "../Enums/httpStatusCode";
import { UserService } from "../services/userServices";
import userModel from "../models/userModel";

const userService = new UserService();


async function isBlocked(req: Request, res: Response, next: NextFunction) {
   try {
      const userId = req.body.userId;
      console.log(userId);
      
      if (!userId) {
         return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. User ID not found.' });
      };
      const user = await userModel.findOne({userId})
      console.log("user is blocked => ", isBlocked)
      if (user?.isBlocked === true) {
         return res.status(HTTP_statusCode.Unauthorized).json({ message: 'Access denied. User is blocked.' });
      }
      next();
   } catch (error) {
      return res.status(HTTP_statusCode.InternalServerError).json({ message: 'Server error.' });
   }
}

export default isBlocked;