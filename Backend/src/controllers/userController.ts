import { Request, Response } from "express";
import {createToken, secret_key} from "../config/jwtConfig";
import { UserService } from "../services/userServices";
import jwt from "jsonwebtoken";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      await this.userService.signUp(data);
      res.status(201).json({ status: true });
    } catch (error: any) {
      console.log("Error in create user controller", error);
      if (error.message === "Email already in use") {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  async otpVerification(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      console.log("Received data:", data);

      await this.userService.otpVerify(data.email, data.otp);

      res.status(200).json({ message: "verified" });
    } catch (error: any) {
      console.error("Error during OTP verification:", error.message);

      if (error.message === "Wrong OTP") {
        res.status(409).json({ message: "Wrong OTP" });
      } else if (error.message === "OTP expired or not found") {
        console.log("otp expired");

        res.status(409).json({ message: "OTP expired or not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async verifyLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await this.userService.verifyLogin(email, password);
      if (!result) {
        return res.status(401).json({ message: "Invalid login credentials" });
      }
      res.cookie('refreshToken', result.refreshToken, {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 30 * 24 * 60 * 60 * 1000, 
      });
  
      const { accessToken, userInfo } = result;
      const cred = {accessToken , userInfo}
      res.status(200).json({ message: "Login successful", cred });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
  
  async resendOtp(req: Request, res: Response) {
    try { 
      const { email } = req.body;
      console.log("resend getting here");
      console.log("controller email resend", email);
      const result = await this.userService.resendOtp(email);
    } catch (error) {}
  }

  async editUser(req : Request ,  res : Response) {
    try {
      console.log("edit user controller datat" , req.body)
      const {firstName , lastName, phone ,userId} = req.body
      const updatedUser = await this.userService.editUserService(firstName, lastName, phone, userId);

      if (updatedUser) {
        res.status(200).json({ message: 'User updated successfully', data: updatedUser });
      } else {
        res.status(400).json({ message: 'No changes found' });
      }
    } catch (error : any) {
      if (error.message === "No changes founded") {
        res.status(304).json({ message: "No changes founded" });
     } else {
        res.status(500).json({ message: 'Internal Server Error' });
     }
    }
  }

  async getCourses(req : Request , res : Response ) {
    try {
      const courses = await this.userService.getCoursesService()
      res.status(200).json(courses)
    } catch ( error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async getCourseDetail(req : Request, res : Response) {
    try {
      const {id} = req.params
      const courseData =  await this.userService.getCourseDetail(id as string)
      res.status(200).json(courseData)
    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async coursePayment(req : Request, res : Response) {
    try {
      const {amount,currency,email,courseId,} = req.body

      console.log(amount);
      

      const order = await this.userService.CoursePaymentService(amount as number,currency,email,courseId)

      res.status(201).json({ message: 'Order created successfully', order })
    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async saveCourse (req : Request, res : Response) {
    try {
      const { email, courseId } = req.body

      const response = await this.userService.saveCourseService(courseId as string ,email as string)

      res.status(201).json(true)
    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  
}

