import UserModel, { IUser } from "../models/userModel";

import { MongoServerError } from "mongodb";
import bcrypt from "bcrypt";
import { error } from "console";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";
import sendTutorCredential from "../helper/tutorLoginMail";
import TutorApplication from "../models/applicationModel";
import TutorProfile from "../models/tutorProfileModel";
import { createToken } from "../config/jwtConfig";
import { Course } from "../models/courseModel";
import Category from "../models/categoryModel";

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
          tutor : 1,
          
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

      // const accessToken = jwt.sign(
      //   { id: user.userId, email: user.email },
      //   process.env.SECRET_KEY!,
      //   { expiresIn: "1h" }
      // );

      return user;
      
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
    } catch (error : any) {
      throw error;
    }
  }

  static async getUsersRepo(): Promise< any> {
    try {
      const data = await UserModel.find({}, 
        {
          _id : 0, 
          firstName : 1, 
          lastName : 1,
          email :1,
          phone: 1,
          createdAt : 1,
          roles : 1,
          isBlocked : 1
      }
    )
      
      console.log(data);
      return data
      
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  }

  static async blockUser(email : string) : Promise<boolean | void> {
    try {
      const response = await UserModel.findOneAndUpdate(
        { email: email },               
        { isBlocked: true }
      );
      
      return true;
      
    } catch (error : any) {
      console.error('Error in blocking user in  repo:', error);
    }
  }

  static async unblockUserRepo(email : string) : Promise<boolean | void> {
    try {
      const response = await UserModel.findOneAndUpdate(
        { email: email },               
        { isBlocked: false }
      );
      
      return true;
      
    } catch (error : any) {
      console.error('Error in blocking user in  repo:', error);
    }
  }

  static async addTutorToUserModel(
    email: string,
    uniqueId: string,
    uniquePass: any
  ): Promise<any | void> {
    try {
      const user = await UserModel.findOneAndUpdate(
        { email: email },
        {
          $set: {
            tutor: true,
            tutorCredentials: {
              tutorId: uniqueId,
              passwordHash: uniquePass,
            },
          },
        },
        {
          new: true, 
          projection: {
            _id: 0,
          userId: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          passwordHash: 1,
          isBlocked: 1,
          tutor : 1,
          
          },
        }
      );
  
      if (!user) {
        throw new Error('User not found');
      }
  
      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.userId,
        phone: user.phone,
        isBlocked: user.isBlocked,
        tutor: user.tutor,
        tutorCredential: user.tutorCredentials,
        
      };

      await TutorApplication.findOneAndUpdate({email : email} ,
        {
          $set : {
            status : 'accepted'
          }
        }
      )
  
      return userInfo;
    } catch (err: any) {
      console.error('Error in addTutorToUserModel:', err.message);
      throw err; 
    }
  }

  static async verifyTutor(applicationId :string , passcode :any) {
    try {
      
      const user = await UserModel.findOne({ 'tutorCredentials.tutorId': applicationId },
        {
          _id: 0,
          userId: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          phone: 1,
          passwordHash: 1,
          isBlocked: 1,
          tutor : 1,
          tutorCredentials : 1
        }
      );

      if(!user) {
        throw new Error("Tutor dosen't exist.")
      }

      // const mismatch = await bcrypt.compare(passcode, user.tutorCredentials?.passwordHash as any)
      // console.log(passcode, user.tutorCredentials?.passwordHash);
      

      // console.log("type of passcode" , typeof(passcode) , "type of hash" , typeof(user.tutorCredentials?.passwordHash));
      

      // console.log(mismatch, "pass");
      

      // if(!mismatch) {
      //   throw new Error("Wrong passcode")
      // }

      if(passcode !== user.tutorCredentials?.passwordHash) {
        throw new Error("Wrong passcode")
      }

      const userInfo = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId: user.userId,
        phone: user.phone,
        isBlocked: user.isBlocked,
        tutor : user.tutor,
        tutorCredential: user.tutorCredentials,
      };

      return userInfo;

    } catch (error : any) {
      console.log("Error in verifying tutor login in tutor repo", error.message);
      throw new Error(error.message);
    }
  }
  

  static  async getApplicantDataRepo (email : string) {
    try { 
      const tutorData = await TutorProfile.findOne({email : email},
        {
          _id : 0,
          applicationId : 1,
          tutorRole :1,
          education : 1,
          experience :1,
          bio : 1,
          role : 1,
          language : 1,
          country : 1
        }
      )
      return tutorData;
    } catch (error : any) {
      console.log("Error in getting applicant data user repo", error.message); 
      throw new Error(error.message);
    }
  }
  
  static async getCourses() {
    try {
      const Courses = await Course.find({})
      return Courses;
    } catch (error : any) {
      console.log("Error in getting courses user repo", error.message); 
      throw new Error(error.message);
    }
  }

  static async getCourse(id : string) {
    try {
        const course = await Course.findOne({courseId : id}).populate({
          path: 'sections',
          populate: { path: 'videos' }  
        });

        console.log(course , "sss");
        
        if(!course) {
          throw new Error("Cannot find course.")
        }

        const tutor = await TutorProfile.findOne({ email : course?.email})
        if(!tutor) {
          throw new Error("Cannot find tutor.")
        }

        const userTutor = await UserModel.findOne({email : tutor?.email})
        if(!userTutor) {
          throw new Error("Cannot find userTutor.")
        }


        const CourseData = {
            name : course.name,
            description : course.description,
            Category : course.category,
            sections : course.sections,
            tags : course.tags,
            language : course.language,
            ratings : course?.ratings,
            comments : course?.comments,
            thumbnail : course.thumbnail,
            tutorName : userTutor.firstName + userTutor.lastName,
            tutorBio : tutor.bio,
            education : tutor.education,
            certifications : tutor.certifications,
            email : tutor.email,
            courseId : course.courseId,
            price : course.price,
            uploadedDate : course?.createdAt
        }

        return CourseData;
    } catch (error : any) {
      console.log("Error in getting course detail user repo", error.message); 
      throw new Error(error.message);
    }
  }
}



