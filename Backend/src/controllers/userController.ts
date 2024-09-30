import { query, Request, Response } from "express";

import { UserService } from "../services/userServices";
import HTTP_statusCode from "../Enums/httpStatusCode";


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

      res.cookie("RefreshToken", result.refreshToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
     });
     res.cookie("AccessToken", result.accessToken, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000,
     });
  
      const { userInfo } = result;
      const cred = { userInfo}
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
      // console.log("edit user controller datat" , req.body)
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

  async getCourses(req: Request, res: Response) {
    try {
        const { category, page = "1", limit = "10" } = req.query as { category?: string; page?: string; limit?: string };
      
        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const courses = await this.userService.getCoursesService(category as string, pageNumber, limitNumber);
        res.status(200).json(courses);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: error.message });
    }
}



  async   getCourseDetail(req : Request, res : Response) {
    try {
      const {id} = req.params
      // console.log(id , "id");
      
      const courseData =  await this.userService.getCourseDetail(id as string)
      // console.log(courseData.sections[0].videos);
      
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

  async checkEnrollement(req : Request, res : Response) {
    try {
      const  {courseId , email} = req.params
      // console.log(courseId , "cuu");
      

      const response = await this.userService.checkEnrollementSevice(courseId as string, email as string)

        // console.log(response);
        
      res.status(200).json(response)
    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async MyCourses(req : Request, res : Response) {
    try {
      
      const userId = req.params.userId;
      const { type } = req.query;

      const courses = await this.userService.MyCoursesService(userId as string , type as string)

      res.status(200).json(courses)

    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

 

  async saveProfilePic(req : Request, res : Response) {
    try {
      const profile = req.file
      const userId = req.body.userId
      
      if(!profile) {
        throw new Error("No profile given")
      }

      const status = await this.userService.saveProfile(profile as Express.Multer.File , userId as string)

      res.status(201).json(status)
      
    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }


  async getProfile(req : Request, res : Response) {
    try {
     const {email} = req.params
     const profileUrl = await this.userService.getProfileService(email as string)
    //  console.log(profileUrl);
     
      res.status(HTTP_statusCode.OK).json(profileUrl)
    } catch (error : any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async getTutorDetails(req : Request, res : Response) {
    try {
       const {id} = req.params
       const tutorData =  await this.userService.tutorDataService(id as string)
       res.status(HTTP_statusCode.OK).json(tutorData)
    } catch (error :any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }
 
  async  addMoney (req : Request, res : Response) {
    try {
       const {userId} = req.params
       const data = req.body
       
       
       const wallet =  await this.userService.addMoneySerice(userId as string, data as any)
       res.status(HTTP_statusCode.OK).json(wallet)
    } catch (error :any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async  getTransactions (req : Request, res : Response) {
    try {
       const {userId} = req.params
       console.log(userId);
       
       const wallet =  await this.userService.getTransactionsSerivce(userId as string)
       console.log(wallet,"wallet");
       
       res.status(HTTP_statusCode.OK).json(wallet)
    } catch (error :any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async  getRatings (req : Request, res : Response) {
    try {
       const {courseId} = req.params
      
       
       const ratings =  await this.userService.getRatingsService(courseId as string)
       console.log(ratings)
       
       res.status(HTTP_statusCode.OK).json(ratings)
    } catch (error :any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  

   
}

