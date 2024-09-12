import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import HTTP_statusCode from "../Enums/httpStatusCode";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const userId = req.query.userId
   
     
     console.log(userId);
     
  
    const user = await userModel.findOne({ userId: userId }).lean();

   

    if (user?.isBlocked === true) {
      return res
        .status(HTTP_statusCode.Unauthorized)
        .json({ message: "Access denied." });
    }
    next();
  } catch (error: any) {
    console.log("error in block checking user", error.message);
  }
};

export {userAuth};
