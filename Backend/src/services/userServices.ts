import bcrypt from "bcrypt";
import redisClient from "../helper/redisCache";
import  UserRepositary  from "../repository/userRepository";
import { AwsConfig } from "../config/awsFileConfigs";
import { S3Client } from "@aws-sdk/client-s3";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { v4 as uuidv4 } from "uuid";
import sendEmailOtp from "../helper/mailService";
import { createRefreshToken, createToken } from "../config/jwtConfig";
import { ICleanedUser, ICourse, IEditUser, IOrder, IRating, ITransaction, ITutorData, IUserInfo, IWallet } from "../interfaces/common.interfaces";
import { createUniquePass } from "../helper/tutorCredentials";
import { IAdminRepository } from "../interfaces/admin.repository.interface";
import razorpay from "../config/razorpay";
import ICourseRepository from "../interfaces/course.repository.interface";

class UserService {
    private userRepository : IUserRepository;
    private adminRepository : IAdminRepository;
    private courseRepository : ICourseRepository;

    aws = new AwsConfig()

    constructor(
      userRepository : IUserRepository,
      adminRepository : IAdminRepository,
      courseRepository : ICourseRepository,
    ) {
      this.userRepository = userRepository,
      this.adminRepository = adminRepository,
      this.courseRepository = courseRepository
    }

   signUp = async(userData: any) : Promise<boolean> =>  {
    try {
      const existUser = await this.userRepository.findUser(userData.email);
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
      console.log("error in controller creaing user", error.message);
      throw error;
    }
  }

   otpVerify = async(email: string, inputOtp: string): Promise<boolean> => {
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
        await this.userRepository.createUser(userData);
        await redisClient.del(email);
        await redisClient.del(`tempUser:${email}`);
        return true;
      }
    } catch (error: any) {
      console.error("Error during OTP verification:", error.message);
      throw error;
    }
  }

   verifyLogin = async(email: string,password: string): Promise<{userInfo: ICleanedUser;accessToken: string; refreshToken: string;}> => {
    try {
      const userInfo  = await this.userRepository.validateLoginUser(email, password);
      console.log(userInfo ,"userinfo")
      const accessToken = createToken(userInfo.userId as string, "user");
      const refreshToken = createRefreshToken(userInfo.userId as string, "user");
      return { userInfo, accessToken, refreshToken };
    } catch (error: any) {
      console.error("Error during login verification:", error.message);
      throw error;
    }
  }

   resendOtp = async(email: any): Promise<boolean> => {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      await redisClient.setEx(email, 60, otp);
      sendEmailOtp(email, otp);
      console.log("Resend generated OTP:", otp);
      return true;
    } catch (error: any) {
      console.error("Error during OTP resend:", error.message);
      throw error;
    }
  }

   editUser = async(userId : string ,updateData : object): Promise<IEditUser> => {
    try {
      const user = await this.userRepository.editUser(userId , updateData)
      const newData = {
        firstName : user?.firstName,
        lastName : user?.lastName,
        phone :user?.phone,
        email : user?.email
      }
      return newData;
    } catch (error) {
      throw error;
    }
  }

  getCourses = async(category: string , page: number, limit: number , filter?: string) : Promise<{ courses: ICourse[], totalPages : number}> => {
    try {
      const response = await this.userRepository.getCourses(category, page, limit);
      const coursesWithUrls = await Promise.all(
        response.courses.map(async (course: any) => {
          const thumbnails = course.thumbnail
            ? await this.aws.getfile(course.thumbnail,`tutors/${course.email}/courses/${course.courseId}/thumbnail`)
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

   getCourseDetail = async(id: string) : Promise<any> => {
    try {
      const response = await this.userRepository.courseDeatils(id)
      const tutor = await this.userRepository.findUser(response?.email)
      const thumbnailUrl = await this.aws.getfile(
        response?.thumbnail as string,
        `tutors/${response.email}/courses/${response.courseId}/thumbnail`
      );
       let profileUrl =''
      if(tutor?.profile) {
         profileUrl = await this.aws.getfile(tutor?.profile as string,`users/profile/${tutor?.userId}` )
      }
      const sectionsWithUrls = await Promise.all(
        response.sections.map(async (section: any, index: number) => {
          const videosWithUrls = await Promise.all(
            section.videos.map(async (video: any) => {
              console.log(video.videoUrl, "vurl");

              const videoUrl = await this.aws.getfile(
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


  CoursePayment = async(amount: number,currency: string,email: string,courseId: string) : Promise<any> => {
      try {
        const adminShare = parseFloat((amount * 0.05).toFixed(2));
        const tutorShare = parseFloat((amount * 0.95).toFixed(2));

        const options = {
          amount: amount * 100, 
          currency,
          receipt: `receipt_${Math.floor(Math.random() * 1000)}`,
        };
        const user = await this.userRepository.findUser(email);
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
        const course = await this.userRepository.getCourse(courseId);
        const tutor = await this.userRepository.findUser(course?.email || ""); 
        const adminTransaction = {
          courseId : courseId,
          course : course?.name,
          tutorId : tutor?.userId,
          tutor : tutor?.firstName,
          transactionId : uuidv4()
        }
        await this.userRepository.coursePaymentWallet(tutor?.userId || "", tutorShare, course?.name || "");
        await this.adminRepository.adminPaymentWallet(adminShare , adminTransaction); 
        await this.userRepository.saveOder(orderDetails);
        await this.userRepository.saveCourse(courseId, email);
        const order = await razorpay.orders.create(options);
        return order;
      } catch (error: any) {
        console.error("Error in payment course :", error.message);
        throw new Error(`Error processing payment: ${error.message}`);
      }
  }
  

   saveCourse = async(courseId: string, email: string) : Promise<boolean> => {
    try {
      return await this.userRepository.saveCourse(courseId, email);
    } catch (error: any) {
      console.error("Error in saving course in serice :", error.message);
      throw error;
    }
  }

   checkEnrollement = async(courseId: string, email: string) : Promise<boolean> =>{
    try {
      const user = await this.userRepository.findUser(email as string);
      if (user?.courses) {
        const isEnrolled = (user.courses as string[]).includes(courseId);
        console.log("enrollled", isEnrolled, courseId);
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

   MyCourses = async(userId: string, type: string) : Promise<any> =>  {
    try {
      const getCouses = await this.courseRepository.getUserCourses(
        userId as string,
        type as string
      );
      const coursesWithUrls = await Promise.all(
        getCouses.map(async (course: ICourse) => {
          const thumbnails = course.thumbnail
            ? await this.aws.getfile(course.thumbnail,`tutors/${course.email}/courses/${course.courseId}/thumbnail`)
            : null;
          return { ...course, thumbnail: thumbnails };
        })
      );
      return coursesWithUrls;
    } catch (error) {
      throw error;
    }
  }



   saveProfile = async(profile: Express.Multer.File, userId: string) : Promise<boolean> => {
    try {
      const profileUrl = await this.aws.uploadFileToS3(`users/profile/${userId}/`,profile);
      return await this.userRepository.saveProfile(userId as string,profileUrl as string);
    } catch (error: any) {
      console.error("Error in saving profile pic user serice :", error.message);
      throw error;
    }
  }

   getProfile = async(email: string) : Promise<string> => {
    try {
      const user = await this.userRepository.findUser(email)  
      let profileUrl = ""
       if(user?.profile) {
        profileUrl = await this.aws.getfile(user?.profile as string,`users/profile/${user?.userId}`);
       }
      return profileUrl;
    } catch (error: any) {
        console.error("Error in getting profile pic user serice :",error.message);
      throw error;
    }
  }

   tutorData = async(id: string) : Promise<ITutorData> => {
    try {
      const user = await this.userRepository.findUserById(id as string);
      const tutor = await this.userRepository.getApplicantData(user?.email as string);
      let profileUrl = "";
      if (user?.profile) {
        profileUrl = await this.aws.getfile(
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
      throw error;
    }
  }

   addMoney = async(userId: string , data : any) : Promise<void> => {
    try {
       await this.userRepository.newPayment(userId as string, data as any) 
    } catch (error: any) {
      console.error("Error in adding money user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  

   getTransactions =async(userId: string) : Promise<IWallet | null> =>{
    try {
        return await this.userRepository.transactions(userId as string)  
    } catch (error: any) {
      console.error("Error in getting transactions user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

   getRatings = async(courseId: string): Promise<IRating[]> => {
    try {
        return await this.userRepository.ratings(courseId as string)
    } catch (error: any) {
      console.error("Error in getting ratings user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

   getOrders =async(userId: string) : Promise<any> => {
    try {
        const orders = await this.userRepository.orders(userId as string)
        const CompletedOrders = await Promise.all(
          orders.map(async (order : IOrder) => {
            const {name , thumbnail , category ,email} = await this.userRepository.getCourse(order?.courseId);
            const thumbnailUrl = await this.aws.getfile(thumbnail as string ,`tutors/${email}/courses/${order?.courseId}/thumbnail`)
            return {
              courseName : name,
              thumbnail : thumbnailUrl,
              category,
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
  addRating =async(newRating: object) : Promise<IRating>  => {
    try {
        return await this.userRepository.addRating(newRating)
    } catch (error: any) {
      console.error("Error in getting ratings user serice :", error.message);
      throw new Error(` ${error.message}`);
    }
  }

  
}

export default UserService;
