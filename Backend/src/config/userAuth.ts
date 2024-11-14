

import { Request, Response, NextFunction } from "express";

import HTTP_statusCode from "../Enums/httpStatusCode";
import userModel from "../models/userModel";

async function userAuth(req: Request, res: Response, next: NextFunction) {
   try {
      const userId = req.headers['userid'];
      console.log(userId , "user");
      if(userId) {
         const user = await userModel.findOne({userId})
         console.log(user);
         
         if(user?.isBlocked === true) {
            return res.status(HTTP_statusCode.NoAccess).json('User Blocked')
         }
      }

      next()
      
   } catch (error) {
      return res.status(HTTP_statusCode.InternalServerError).json({ message: 'Server error.' });
   }
}

export default userAuth;