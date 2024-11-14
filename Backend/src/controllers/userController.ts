import { query, Request, Response } from "express";

import  UserService  from "../services/userServices";
import HTTP_statusCode from "../Enums/httpStatusCode";
import IUserService from "../interfaces/user.service.interface";


 class UserController {
  private userService: IUserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

   createUser = async(req: Request, res: Response) => {
    try {
      const data = req.body;
      await this.userService.signUp(data);
      res.status(201).json({ status: true });
    } catch (error: any) {
      console.log("User Controller => Error in creating user ", error);
      if (error.message === "Email already in use") {
        res.status(HTTP_statusCode.Conflict).json({ message: error.message });
      } else {
        res.status(HTTP_statusCode.InternalServerError).json({ message: "Something went wrong" });
      }
    }
  }

   otpVerification = async(req: Request, res: Response) => {
    try {
      const {email , otp} = req.body.data;
      await this.userService.otpVerify(email,otp);
      res.status(HTTP_statusCode.OK).json({ message: "verified" });
    } catch (error: any) {
      console.log("User Controller => Error during OTP verification: ", error);
      if (error.message === "Wrong OTP") {
        res.status(HTTP_statusCode.Conflict).json({ message: "Wrong OTP" });
      } else if (error.message === "OTP expired or not found") {
        console.log("otp expired");
        res.status(HTTP_statusCode.NotFound).json({ message: "OTP expired or not found" });
      } else {
        res.status(HTTP_statusCode.InternalServerError).json({ message: "Internal server error" });
      }
    }
  }

   verifyLogin = async(req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const result = await this.userService.verifyLogin(email, password);
      res.cookie("RefreshToken", result.refreshToken, {
        httpOnly: true,
        secure: true, 
        sameSite: 'none', 
        maxAge: 7 * 24 * 60 * 60 * 1000,
         path: '/'
     });
     res.cookie("AccessToken", result.accessToken, {
        httpOnly: true,
        secure: true, 
        sameSite: 'none',
        maxAge: 15 * 60 * 1000,
         path: '/'
     });
      const { userInfo } = result;
      const cred = { userInfo}
      res.status(HTTP_statusCode.OK).json({ message: "Login successful", cred });
    } catch (error: any) {
      console.log("User Controller => Error in veryfing login ", error);
       if (error.message === "You are restricted.") {
        res.status(HTTP_statusCode.NoAccess).json({ message: error.message })
      } else if (error.message === "User doesn't exist") {
        res.status(HTTP_statusCode.NotFound).json({ message: error.message })
      } else if(error.message === "Invalid password") {
        res.status(HTTP_statusCode.Conflict).json({ message: error.message })
      } else {
        res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
      }
    }
  }
  
   resendOtp = async(req: Request, res: Response) => {
    try { 
      const { email } = req.body;
      console.log("controller email resend", email);
      await this.userService.resendOtp(email);
      res.status(HTTP_statusCode.OK).json(true)
    } catch (error : any) {
      console.log("User Controller => Error in veryfing login ", error);
      res.status(HTTP_statusCode.InternalServerError).json({ message : error.message})
    }
  }

   editUser = async(req : Request ,  res : Response) => {
    try {
      const {firstName , lastName, phone ,userId} = req.body
      const updateData = {
        firstName,
        lastName,
        phone,
      }
      const updatedUser = await this.userService.editUser(userId ,updateData);
      res.status(HTTP_statusCode.OK).json({ message: 'User updated successfully', data: updatedUser }); 
    } catch (error : any) {
      if (error.message === "No changes detected") {
        res.status(HTTP_statusCode.NoChange).json({ message: "No changes founded" });
     } else {
        res.status(500).json({ message: 'Internal Server Error' });
     }
    }
  }

     saveProfilePic = async(req : Request, res : Response) => {
    try {
      const profile = req.file
      const userId = req.body.userId 
      if(!profile) {
        throw new Error("No profile given")
      }
      const status = await this.userService.saveProfile(profile as Express.Multer.File , userId as string)
      res.status(HTTP_statusCode.updated).json(status) 
    } catch (error : any) {
      console.error(error.message);
      if(error.message === "No profile given") {
        res.status(HTTP_statusCode.NotFound).json(error.message)
      }
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

     getProfile = async(req : Request, res : Response) => {
    try {
     const {email} = req.params
     const profileUrl = await this.userService.getProfile(email as string)  
     res.status(HTTP_statusCode.OK).json(profileUrl)
    } catch (error : any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }


  async getCourses(req: Request, res: Response) {
    try {
        const { category, page = "1", limit = "10", filter } = req.query as { category?: string; page?: string; limit?: string; filter?: string };    
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);
        const courses = await this.userService.getCourses(category as string, pageNumber, limitNumber);
        res.status(HTTP_statusCode.OK).json(courses);
    } catch (error: any) {
        console.error(error.message);
        res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
}



 courseDetails = async(req : Request, res : Response) => {
    try {
      const {id} = req.params
      const courseData =  await this.userService.getCourseDetail(id as string)
      res.status(HTTP_statusCode.OK).json(courseData)
    } catch (error : any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

   coursePayment = async(req : Request, res : Response) => {
    try {
      const {amount,currency,email,courseId,} = req.body
      const order = await this.userService.CoursePayment(amount as number,currency,email,courseId)
      res.status(HTTP_statusCode.updated).json({ message: 'Order created successfully', order })
    } catch (error : any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

  async saveCourse (req : Request, res : Response) {
    try {
      const { email, courseId } = req.body
      await this.userService.saveCourse(courseId as string ,email as string)
      res.status(HTTP_statusCode.updated).json(true)
    } catch (error : any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

  async checkEnrollement(req : Request, res : Response) {
    try {
      const  {courseId , email} = req.params
      const response = await this.userService.checkEnrollement(courseId as string, email as string)   
      res.status(HTTP_statusCode.OK).json(response)
    } catch (error : any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

   MyCourses = async(req : Request, res : Response) => {
    try {  
      const userId = req.params.userId;
      const { type } = req.query;
      const courses = await this.userService.MyCourses(userId as string , type as string)
      res.status(HTTP_statusCode.OK).json(courses)
    } catch (error : any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

   getTutorDetails = async(req : Request, res : Response) => {
    try {
       const {id} = req.params
       const tutorData =  await this.userService.tutorData(id as string)
       res.status(HTTP_statusCode.OK).json(tutorData)
    } catch (error :any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }
 
    addMoney = async(req : Request, res : Response) => {
    try {
       const {userId} = req.params;
       const data = req.body;    
       const wallet =  await this.userService.addMoney(userId as string, data as any)
       res.status(HTTP_statusCode.OK).json(wallet)
    } catch (error :any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

    getTransactions = async(req : Request, res : Response) => {
    try {
       const {userId} = req.params     
       const wallet =  await this.userService.getTransactions(userId as string)
       console.log(wallet,"wallet");       
       res.status(HTTP_statusCode.OK).json(wallet)
    } catch (error :any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

    getRatings = async(req : Request, res : Response) => {
    try {
       const {courseId} = req.params 
       const ratings =  await this.userService.getRatings(courseId as string) 
       res.status(HTTP_statusCode.OK).json(ratings)
    } catch (error :any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  }

    getOrders = async(req : Request, res : Response) => {
    try {
       const {userId} = req.params
       const orders =  await this.userService.getOrders(userId as string)  
       res.status(HTTP_statusCode.OK).json(orders)
    } catch (error :any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  } 

  addRating = async(req : Request, res : Response) => {
    try {
       const newRating = req.body;
       console.log(newRating);
       
       const rating =  await this.userService.addRating(newRating as object)  
       res.status(HTTP_statusCode.updated).json(rating)
    } catch (error :any) {
      console.error(error.message);
      res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
  } 

  


  
  
}

export default UserController;

