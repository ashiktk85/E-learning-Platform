import UserModel, { IUser } from "../models/userModel";
import { MongoServerError } from "mongodb";
import bcrypt from "bcrypt";
import { error } from "console";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

export class UserRepositary {
  
  static async existUser(email: string): Promise<IUser | null> {
    try {
      const existUser = await UserModel.findOne({ email });
      console.log("Existing user found ", existUser);

      return existUser;
    } catch (error: any) {
      console.log(
        "Error in checking existing user in userrepo -> exitUser",
        error
      );
      if (error instanceof MongoServerError && error.code === 11000) {
        throw new Error("Email already exists");
      } else {
        throw error;
      }
    }
  }

  static async createUser(userData: any): Promise<IUser> {
    try {
      console.log("Creating new user with :", userData);
      const newUser = new UserModel(userData);
      console.log("New user created:", newUser);
      return await newUser.save();
    } catch (error: any) {
      console.log("Error in creating new User", error);
      throw new Error(`Error creating user : ${error.message}`);
    }
  }

  static async validateLoginUser(
    email: string,
    password: string
  ): Promise<any> {
    try {
      const user = await UserModel.findOne(
        { email },
        {
          _id: 0,
          userId: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          passwordHash: 1,
          isBlocked: 1,
        }
      );

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const isMatch = await bcrypt.compare(password, user.passwordHash);

      if (!isMatch) {
        throw new Error("Invalid password");
      }

      if (user.isBlocked === true) {
        throw new Error("User blocked.");
      }

      const accessToken = jwt.sign(
        { id: user.userId, email: user.email },
        process.env.SECRET_KEY!,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: user.userId, email: user.email },
        process.env.SECRET_KEY!,
        { expiresIn: "7d" }
      );

      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userid: user.userId,
        phone: user.phone,
        isBlocked: user.isBlocked,
      };

      return { userInfo, accessToken, refreshToken };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async editUserRepository(
    userid: string,
    newUserInfo: { firstName: string; lastName: string; phone: string }
  ): Promise<{ firstName: string; lastName: string; phone: string } | null> {
    try {
      console.log("getting here repo");
      console.log(userid);

      const updatedUser = await userModel
        .findOneAndUpdate(
          { userId: userid },
          { $set: newUserInfo },
          { new: true, runValidators: true }
        )
        .select("firstName lastName phone userId -_id email");

      console.log("updated user:", updatedUser);

      return updatedUser ? updatedUser.toObject() : null;
    } catch (error) {
      throw error;
    }
  }
}
