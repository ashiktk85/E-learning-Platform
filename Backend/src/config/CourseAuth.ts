import { Request, Response, NextFunction } from "express";
import userModel from "../models/userModel";
import HTTP_statusCode from "../Enums/httpStatusCode";
import { Course } from "../models/courseModel";

const CourseAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
     const courseId = req.params.courseId
   
     
     console.log(courseId);
     
  
    const course = await Course.findOne({ courseId : courseId }).lean();

   

    if (course?.isBlocked === true) {
      console.log("blocked");
      
      throw new Error("Course Blocked.")
      
    }
    next();
  } catch (error: any) {
    console.log("error in block checking user", error.message);
    res.status(500).json({ message: error.message });
  }
};

export {CourseAuth};
