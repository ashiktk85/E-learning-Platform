import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { UserRepositary } from "../repository/userRepository";
import sendEmailOtp from "../helper/mailService";
import redisClient from "../helper/redisCache";
import jwt, { Secret } from "jsonwebtoken";
import { createRefreshToken, createToken } from "../config/jwtConfig";
import { AwsConfig } from "../config/awsFileConfigs";
import { Course, ICourse } from "../models/courseModel";
import razorpay from "../config/razorpay";
import orderModel from "../models/orderModel";
import { createUniquePass } from "../helper/tutorCredentials";
import mongoose from "mongoose";
import { CouresRepository } from "../repository/courseRepository";
import { ParamsDictionary } from "express-serve-static-core";
import { S3Client } from "@aws-sdk/client-s3";
import { TutorRepositary } from "../repository/tutorRepositary";
import { adminRepository } from "../repository/adminRepository";

const s3Client = new S3Client({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export class UserService {
  async signUp(userData: any) {
    try {
      const existUser = await UserRepositary.existUser(userData.email);

      if (existUser) {
        throw new Error("Email already in use");
      }

      const saltRounds: number = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      const userId = uuidv4();
      const tempData = {
        userId: userId,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        phone: userData.phone,
        passwordHash: hashedPassword,
        createdAt: new Date(),
      };

      await redisClient.setEx(
        `tempUser:${userData.email}`,
        300,
        JSON.stringify(tempData)
      );

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await redisClient.setEx(userData.email, 60, otp);

      sendEmailOtp(userData.email, otp);

      console.log("Generated OTP:", otp);

      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async otpVerify(email: string, inputOtp: string): Promise<boolean> {
    try {
      const cachedOtp = await redisClient.get(email);
      console.log("Cached OTP:", cachedOtp);

      if (!cachedOtp) {
        console.log("OTP expired or not found");
        throw new Error("OTP expired or not found");
      } else if (cachedOtp !== inputOtp) {
        console.log("OTP mismatch:", { cachedOtp, inputOtp });
        throw new Error("Wrong OTP");
      } else {
        const tempUserData = await redisClient.get(`tempUser:${email}`);

        if (!tempUserData) {
          throw new Error("Temporary user data not found or expired");
        }

        const userData = JSON.parse(tempUserData);

        const user = await UserRepositary.createUser(userData);

        await redisClient.del(email);
        await redisClient.del(`tempUser:${email}`);

        return true;
      }
    } catch (error: any) {
      console.error("Error during OTP verification:", error.message);
      throw new Error(error.message);
    }
  }

  async verifyLogin(
    email: string,
    password: string
  ): Promise<{
    userInfo: { firstName: string; lastName: string; email: string };
    accessToken: string;
    refreshToken: string;
  } | null> {
    try {
      const user = await UserRepositary.validateLoginUser(email, password);

      if (!user) {
        throw new Error("Invalid login credentials");
      }

      const accessToken = createToken(user.userId as string, "user");

      const refreshToken = createRefreshToken(user.userId as string, "user");

      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.userId,
        phone: user.phone,
        isBlocked: user.isBlocked,
        tutor: user.tutor,
        kyc : user?.kyc
      };

      return { userInfo, accessToken, refreshToken };
    } catch (error: any) {
      console.error("Error during login verification:", error.message);
      throw new Error("Failed to verify login");
    }
  }

  async resendOtp(email: any): Promise<boolean> {
    try {
      console.log("service resend otp email");

      const otp = Math.floor(100000 + Math.random() * 900000).toString();

      await redisClient.setEx(email, 60, otp);

      sendEmailOtp(email, otp);

      console.log("Resend generated OTP:", otp);

      return true;
    } catch (error: any) {
      console.error("Error during OTP resend:", error.message);
      throw new Error(error.message);
    }
  }

  async editUserService(
    firstName: string,
    lastName: string,
    phone: string,
    userid: string
  ): Promise<
    { firstName: string; lastName: string; phone: string } | undefined
  > {
    try {
      const newInfo = { firstName, lastName, phone };

      console.log("userid in service", userid);

      const updatedUser = await UserRepositary.editUserRepository(
        userid,
        newInfo
      );

      console.log("data sent to repo from service");

      if (!updatedUser) {
        console.log("no change");
        throw new Error("No changes found");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async getCoursesService(category: string , page: number, limit: number , filter?: string) {
    try {
      const response = await UserRepositary.getCourses(category, page, limit);

      const awsConfig = new AwsConfig();

      const coursesWithUrls = await Promise.all(
        response.courses.map(async (course: ICourse) => {
          const thumbnails = course.thumbnail
            ? await awsConfig.getfile(
                course.thumbnail,
                `tutors/${course.email}/courses/${course.courseId}/thumbnail`
              )
            : null;
          return { ...course, thumbnail: thumbnails };
        })
      );
      return {
        courses: coursesWithUrls,
        totalPages: response.totalPages,
      };
    } catch (error) {
      throw error;
    }
  }

  async getCourseDetail(id: string) {
    try {
      const response = await UserRepositary.getCourse(id);
      const awsConfig = new AwsConfig();

      const thumbnailUrl = await awsConfig.getfile(
        response?.thumbnail as string,
        `tutors/${response.email}/courses/${response.courseId}/thumbnail`
      );
       let profileUrl =''
      if(response?.tutorProfile) {

         profileUrl = await awsConfig.getfile(response?.tutorProfile as string,`users/profile/${response?.tutorId}` )
      }


      const sectionsWithUrls = await Promise.all(
        response.sections.map(async (section: any, index: number) => {
          const videosWithUrls = await Promise.all(
            section.videos.map(async (video: any) => {
              console.log(video.videoUrl, "vurl");

              const videoUrl = await awsConfig.getfile(
                video.videoUrl,
                `tutors/${response.email}/courses/${response.courseId}/videos`
              );
              return { ...video.toObject(), url: videoUrl };
            })
          );
          return { ...section.toObject(), videos: videosWithUrls };
        })
      );

      return {
        ...response,
        thumbnailUrl,
        sections: sectionsWithUrls,
        profileUrl
      };
    } catch (error: any) {
      console.error("Error fetching course details:", error.message);
      throw new Error(`Failed to fetch course details: ${error.message}`);
    }
  }


    async CoursePaymentService(
      amount: number,
      currency: string,
      email: string,
      courseId: string
    ) {
      try {
        console.log("her....")
        const adminShare = amount * 0.05;
        const tutorShare = amount * 0.95;
  
        const options = {
          amount: amount * 100, 
          currency,
          receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
        };
  
        const user = await UserRepositary.existUser(email);
        const paymentId = createUniquePass(10);
        const orderId = createUniquePass(10);
  
        const orderDetails = {
          userId: user?.userId || "", 
          courseId: courseId,
          totalAmount: amount,
          currency: currency,
          paymentId: paymentId,
          orderId: orderId,
          paymentStatus: "Completed",
        };
  
        const course = await UserRepositary.getCourse(courseId);
        const tutor = await UserRepositary.existUser(course?.email || ""); 

        const adminTransaction = {
          courseId : courseId,
          course : course?.name,
          tutorId : tutor?.userId,
          tutor : tutor?.firstName,
          transactionId : uuidv4()
        }
  
        await UserRepositary.coursePaymentWallet(tutor?.userId || "", tutorShare, course?.name || "");
        await adminRepository.adminPaymentWallet(adminShare , adminTransaction); 
  
        await UserRepositary.saveOder(orderDetails);
        await UserRepositary.saveCourse(courseId, email);
  
        const order = await razorpay.orders.create(options);
        return order;
      } catch (error: any) {
        console.error("Error in payment course :", error.message);
        throw new Error(`Error processing payment: ${error.message}`);
      }
    }
  

  async saveCourseService(courseId: string, email: string) {
    try {
      const addCourseUser = await UserRepositary.saveCourse(courseId, email);

      if (addCourseUser === true) {
        return true;
      }

      console.log("user course array didnt add");
    } catch (error: any) {
      console.error("Error in saving course in serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  async checkEnrollementSevice(courseId: string, email: string) {
    try {
      const user = await UserRepositary.existUser(email as string);

      if (!user) {
        throw new Error("User dosen't exist.");
      }

      if (user?.courses) {
        const isEnrolled = (user.courses as string[]).includes(courseId);

        console.log("enrolll", isEnrolled, courseId);

        return isEnrolled;
      }

      return false;
    } catch (error: any) {
      console.error(
        "Error in checkin enrollment in user serice :",
        error.message
      );
      throw new Error(` ${error.message}`);
    }
  }

  async MyCoursesService(userId: string, type: string) {
    try {
      const awsConfig = new AwsConfig();

      const getCouses = await CouresRepository.getUserCourses(
        userId as string,
        type as string
      );

      const coursesWithUrls = await Promise.all(
        getCouses.map(async (course: ICourse) => {
          const thumbnails = course.thumbnail
            ? await awsConfig.getfile(
                course.thumbnail,
                `tutors/${course.email}/courses/${course.courseId}/thumbnail`
              )
            : null;
          return { ...course, thumbnail: thumbnails };
        })
      );
      return coursesWithUrls;
    } catch (error) {}
  }



  async saveProfile(profile: Express.Multer.File, userId: string) {
    try {
      const awsConfig = new AwsConfig();
      const profileUrl = await awsConfig.uploadFileToS3(
        
        `users/profile/${userId}/`,
        profile
      );
      const save = await UserRepositary.saveProfile(
        userId as string,
        profileUrl as string
      );
      return save;
    } catch (error: any) {
      console.error("Error in saving profile pic user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  async getProfileService(email: string) {
    try {
      const awsConfig = new AwsConfig();
      const user = await UserRepositary.existUser(email);

      if (!user) {
        console.log("no user");
      }
      console.log(user, user?.profile, user?.userId);
      let profileUrl = ""
       if(user?.profile) {
        profileUrl = await awsConfig.getfile(
          user?.profile as string,
          `users/profile/${user?.userId}`
        );
       }
      return profileUrl;
    } catch (error: any) {
      console.error(
        "Error in getting profile pic user serice :",
        error.message
      );
      throw new Error(` ${error.message}`);
    }
  }

  async tutorDataService(id: string) {
    try {
      const awsConfig = new AwsConfig();

      const user = await UserRepositary.getUser(id as string);
      const tutor = await TutorRepositary.getTutorDetail(user?.email as string);
      let profileUrl = "";
      if (user?.profile) {
        profileUrl = await awsConfig.getfile(
          user?.profile as string,
          `users/profile/${user?.userId}`
        );
      }
      const tutorData = {
        name: user?.firstName + " " + user?.lastName,
        email: user?.email,
        profileUrl: profileUrl,
        bio: tutor?.bio,
      };
      return tutorData;
    } catch (error: any) {
      console.error("Error in getting tutor data user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  async addMoneySerice(userId: string , data : any) {
    try {
        const newWllet = await UserRepositary.newPayment(userId as string, data as any)
       
        
    } catch (error: any) {
      console.error("Error in adding money user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  

  async getTransactionsSerivce(userId: string) {
    try {
        const wallet = await UserRepositary.transactions(userId as string)
        return wallet
    } catch (error: any) {
      console.error("Error in getting transactions user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  async getRatingsService(courseId: string) {
    try {
        const ratings = await UserRepositary.ratings(courseId as string)
        return ratings
    } catch (error: any) {
      console.error("Error in getting ratings user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  async getOrders(userId: string) {
    try {
      const awsConfig = new AwsConfig();
        const orders = await UserRepositary.orders(userId as string)

        const CompletedOrders = await Promise.all(
          orders.map(async (order) => {
            const {name , thumbnail , Category ,tutorEmail} = await UserRepositary.getCourse(order?.courseId);
            const thumbnailUrl = await awsConfig.getfile(thumbnail as string ,`tutors/${tutorEmail}/courses/${order?.courseId}/thumbnail`)
            return {
              courseName : name,
              thumbnail : thumbnailUrl,
              Category,
              ...order
            }
          })
        )
        return CompletedOrders;
    } catch (error: any) {
      console.error("Error in getting ratings user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  
  
}
