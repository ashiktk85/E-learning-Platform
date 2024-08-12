import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { UserRepositary } from "../repository/userRepository";
import sendEmailOtp from "../helper/mailService";
import redisClient from "../helper/redisCache";
import jwt, { Secret } from "jsonwebtoken";

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
  ): Promise<
    | {
        userInfo: { firstName: string; lastName: string; email: string };
        token: string;
      }
    | any 
    | null
  > {
    return UserRepositary.validateLoginUser(email, password);
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
  ): Promise<{ firstName: string; lastName: string; phone: string } | undefined> {
    try {
      const newInfo = { firstName, lastName, phone };
  
      console.log("userid in service", userid);
  
   
      const updatedUser = await UserRepositary.editUserRepository(userid, newInfo);
  
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
  
}
