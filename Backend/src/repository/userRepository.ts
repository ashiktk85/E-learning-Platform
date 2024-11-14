import { Model } from "mongoose";
import { ICleanedUser, ICourse, ICourseDetail, IOrder, IRating, ITutorInfo, IUser, IWallet } from "../interfaces/common.interfaces";
import { IUserRepository } from "../interfaces/user.repository.interface";
import BaseRepository from "./baseRepository";
import { Course } from "../models/courseModel";
import bcrypt from "bcrypt";
import TutorProfile from "../models/tutorProfileModel";
import { Wallet } from "../models/walletModel";
import orderModel from "../models/orderModel";
import Rating from "../models/ratingModel";


class UserRepositary implements IUserRepository {
  private userRepo : BaseRepository<IUser>;
  private courseRepo : BaseRepository<ICourse>

  constructor(
    userModel : Model<IUser>,
    coureModel : Model<ICourse>
  ) {
    this.userRepo = new BaseRepository(userModel)
    this.courseRepo = new BaseRepository(coureModel)
  }

  async findUser(email: string): Promise<IUser> {
      try {
        const user = await this.userRepo.find({email : email})
        if(!user) {
          throw new Error("User dosent exist.")
        }
        return user;
      } catch ( error : any) {
      console.error('Error fetching user in user-controller:', error.message);
      throw error;
      }
  }

  async findUserById(userId: string): Promise<IUser> {
    try {
      const user = await this.userRepo.find({userId})
      if(!user) {
        throw new Error("User dosent exist.")
      }
      return user;
    } catch ( error : any) {
    console.error('Error fetching user in user-controller:', error.message);
    throw error;
    }
}
  
  async getCourse(id: string): Promise<ICourse> {
    try {
      const course = await Course.findOne(
              { courseId: id },
              { isBlocked: false }
            ).populate({
              path: "sections",
              populate: { path: "videos" },
            }).exec();
      
            if (!course) {
              throw new Error("Cannot find course.");
            }

            return course;
    } catch ( error : any) {
      console.log("Error in getting course detail user repo", error.message);
      throw error;
    }
}


 async validateLoginUser(email: string,password: string): Promise<ICleanedUser> {
  try {
    const user = await this.userRepo.find({email});
    if (user?.isBlocked === true) {
      throw new Error("You are restricted.");
    }
    if (!user) {
      throw new Error("User doesn't exist");
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new Error("Invalid password");
    }
    const userData  = {
      userId : user?.userId,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      tutor : user?.tutor,
      isBlocked: user?.isBlocked,
      profileUrl : user?.profile || ""
  }
    return userData;
  } catch (error: any) {
    throw error;
  }
}


   async createUser(userData: any): Promise<IUser> {
    try {
      console.log("Creating new user with :", userData);
      return await this.userRepo.create(userData)
    } catch (error: any) {
      console.log("Error in creating new User", error);
      throw new Error(`Error creating user : ${error.message}`);
    }
  }



  async courseDeatils(id: string) : Promise<any> {
    try {
      const course = await Course.findOne(
        { courseId: id },
        { isBlocked: false }
      ).populate({
        path: "sections",
        populate: { path: "videos" },
      }).exec();

      if (!course) {
        throw new Error("Cannot find course.");
      }

      const tutor = await TutorProfile.findOne({ email: course?.email });
      if (!tutor) {
        throw new Error("Cannot find tutor.");
      }

      const userTutor = await this.userRepo.find({ email: tutor?.email });
      if (!userTutor) {
        throw new Error("Cannot find userTutor.");
      }

      const CourseData = {
        id: course._id,
        name: course.name,
        description: course.description,
        Category: course.category,
        sections: course.sections,
        tags: course.tags,
        language: course.language,
        ratings: course?.ratings,
        comments: course?.comments,
        thumbnail: course.thumbnail,
        tutorName: userTutor.firstName + userTutor.lastName,
        tutorBio: tutor.bio,
        tutorEmail: tutor?.email,
        tutorProfile: userTutor?.profile,
        tutorId: userTutor?.userId,
        education: tutor.education,
        certifications: tutor.certifications,
        email: tutor.email,
        courseId: course.courseId,
        price: course.price,
        uploadedDate: course?.createdAt,
        users: course?.users?.length,
      };

      return CourseData;
    } catch (error: any) {
      console.log("Error in getting course detail user repo", error.message);
      throw new Error(error.message);
    }
  }



   async editUser(userid: string,newUserInfo: object): Promise<IUser | null> {
    try {
      return await this.userRepo.updateAndReturn(
        { userId: userid },
         newUserInfo 
      )
    } catch (error: any) {
      throw error;
    }
  }

  async verifyTutor(email: string, passcode: string) : Promise<ITutorInfo> {
    try {
      const user = await this.userRepo.find({ email: email });

      if (!user) {
        throw new Error("Tutor dosen't exist.");
      }

      if (passcode !== user.tutorCredentials?.passwordHash) {
        throw new Error("Wrong passcode");
      }
      console.log(user?.kyc);
      
      if (user?.kyc !== 'verified') {
        throw new Error("Complete KYC to login");
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

      return userInfo;
    } catch (error: any) {
      console.log(
        "Error in verifying tutor login in tutor repo",
        error.message
      );
      throw new Error(error.message);
    }
  }

   async getApplicantData(email: string) : Promise<any> {
    try {
      const tutorData = await TutorProfile.findOne(
        { email: email },
        {
          _id: 0,
          applicationId: 1,
          tutorRole: 1,
          education: 1,
          experience: 1,
          bio: 1,
          role: 1,
          language: 1,
          country: 1,
          profilePhotoUrl: 1,
          email: 1,
          userId: 1,
        }
      );

      const tutor = {
        userId: tutorData?.userId,
        bio: tutorData?.bio,
        tutorRole: tutorData?.role,
        email: email,
        education: tutorData?.education,
        country: tutorData?.country,
        experience: tutorData?.experience,
        language: tutorData?.language,
        profilePhotoUrl: tutorData?.profilePhotoUrl,
      };
      return tutor;
    } catch (error: any) {
      console.log("Error in getting applicant data user repo", error.message);
      throw new Error(error.message);
    }
  }

   async getCourses(category: string, page: number, limit: number , filter?: string) : Promise<{courses :ICourse[],totalPages : number }> {
    try {  
      let filter: { isBlocked: boolean; category?: string } = {
        isBlocked: false,
      };
      if (category && category !== "All") {
        filter.category = category;
      } else if (category && category === "All") {
        filter = { isBlocked: false };
      }
      const skip = (page - 1) * limit;
      const totalCourses = await Course.countDocuments(filter).exec();
      const totalPages = Math.ceil(totalCourses / limit);
      const courses = await Course.find(filter, { isBlocked: false })
        .lean()
        .skip(skip)
        .limit(limit)
        .exec();

        console.log(totalCourses , "tot")
        console.log(limit , "lim" , skip);
        
        
      return {
        courses,
        totalPages,
      };
    } catch (error: any) {
      console.log("Error in getting courses user repo", error.message);
      throw error;
    }
  }

  
    saveOder = async(orderData: any) : Promise<boolean> =>{
    try {
      const order = await new orderModel(orderData);
      await order.save();
      return true;
    } catch (error: any) {
      console.log("Error in saving order data in user repo", error.message);
      throw new Error(error.message);
    }
  }

   async saveCourse(courseId: string, email: string) : Promise<boolean> {
    try {
        await this.userRepo.update(
        { email: email },
        {
          $push: { courses: courseId },
        }
      )
      const user = await this.userRepo.find({ email: email });
      const userId = user?.userId;
      await Course.updateOne(
        { courseId: courseId },
        {
          $push: {
            users: userId,
          },
        }
      );
      return true;
    } catch (error: any) {
      console.log(
        "Error in saving course data on user in user repo",
        error.message
      );
      throw new Error(error.message);
    }
  }

   async saveProfile(userId: string, profileUrl: string) : Promise<boolean> {
    try {
      return await this.userRepo.update({userId} , {profile : profileUrl})
    } catch (error: any) {
      console.log("Error in saving profile  in user repo", error.message);
      throw new Error(error.message);
    }
  }

   async newPayment(userId: string, data: { amount: number }) : Promise <IWallet> {
    try {  
      let wallet = await Wallet.findOne({ userId });
      const id = Math.floor(1000 + Math.random() * 9000).toString();
      const transaction = {
        transactionId: id,
        amount: data.amount,
        transactionType: "credit" as "credit",
        date: new Date(),
      };
      if (!wallet) {
        wallet = new Wallet({
          userId,
          balance: data.amount,
          transactions: [transaction],
        });
        await wallet.save();
      } else {
        wallet.balance += data.amount;
        wallet.transactions.push(transaction);
        await wallet.save();
      }
      return wallet;
    } catch (error: any) {
      console.error("Error in saving wallet in wallet repo", error.message);
      throw new Error(error.message);
    }
  }

   async transactions(userId: string) :Promise<IWallet | null> {
    try {
      console.log(userId)
      let wallet = await Wallet.findOne({ userId }).lean();
      console.log(userId , wallet)
      if (wallet) {
        return wallet;
      } else {
        return null;
      }
    } catch (error: any) {
      console.error("Error in saving wallet in wallet repo", error.message);
      throw new Error(error.message);
    }
  }

   async incomeWallet(userId: string) : Promise<number> {
    try {
      const result = await Wallet.aggregate([
        { $match: { userId } },
        { $unwind: "$transactions" },
        {
          $match: {
            "transactions.transactionType": "course payment",
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: "$transactions.amount" },
          },
        },
      ]);

      if (result && result.length > 0) {
        return result[0].totalAmount;
      } else {
        return 0;
      }
    } catch (error: any) {
      console.error("Error in saving wallet in wallet repo", error.message);
      throw new Error(error.message);
    }
  }

   async coursePaymentWallet(userId: string,amount: any,courseName: string) : Promise<any> {
    try {
      let wallet = await Wallet.findOne({ userId });
      const id = Math.floor(1000 + Math.random() * 9000).toString();
      const parsedAmount = typeof amount === "string" ? Number(amount) : amount;
      if (isNaN(parsedAmount)) {
        throw new Error("Invalid amount. Must be a valid number.");
      }
      const transaction = {
        transactionId: id,
        amount: parsedAmount,
        transactionType: "course payment" as "course payment",
        course: courseName,
        date: new Date(),
      };
      if (!wallet) {
        wallet = new Wallet({
          userId,
          balance: parsedAmount,
          transactions: [transaction],
        });
        await wallet.save();
      } else {
        wallet.balance += parsedAmount;
        wallet.transactions.push(transaction);
        await wallet.save();
      }
      return wallet;
    } catch (error: any) {
      console.error("Error in saving wallet in wallet repo", error.message);
      throw new Error(error.message);
    }
  }

   async ratings(courseId: string) : Promise<IRating[]> {
    try {
       return await Rating.find({ courseId }).lean();
    } catch (error: any) {
      console.error("Error in getting rating repo", error.message);
      throw new Error(error.message);
    }
  }
  
   async orders(userId: string)  : Promise<IOrder[]> {
    try {
      return await orderModel.find({ userId }).lean();
    } catch (error: any) {
      console.error("Error in getting rating repo", error.message);
      throw new Error(error.message);
    }
  }

  async addRating(newRating: object): Promise<IRating> { 
    try {
      const rating = new Rating(newRating);
      const savedRating = await rating.save(); 
      return savedRating; 
    } catch (error: any) {
      console.error("Error in adding rating:", error.message);
      throw new Error(error.message);
    }
  }



//   static async getUsersRepo(
//     page: number,
//     limit: number
//   ): Promise<{ users: any[]; total: number }> {
//     try {
//       const skip = (page - 1) * limit;

//       const users = await UserModel.find(
//         {},
//         {
//           _id: 0,
//           firstName: 1,
//           lastName: 1,
//           email: 1,
//           phone: 1,
//           createdAt: 1,
//           roles: 1,
//           isBlocked: 1,
//         }
//       )
//         .skip(skip)
//         .limit(limit);

//       const total = await UserModel.countDocuments();

//       return { users, total };
//     } catch (error: any) {
//       console.error("Error fetching users:", error);
//       throw new Error("Error fetching users from database");
//     }
//   }

//   static async getTutorsRepo(
//     page: number,
//     limit: number
//   ): Promise<{ users: any[]; total: number }> {
//     try {
//       const skip = (page - 1) * limit;

//       const users = await UserModel.find(
//         { tutor: true },
//         {
//           _id: 0,
//           userId: 1,
//           firstName: 1,
//           lastName: 1,
//           email: 1,
//           phone: 1,
//           createdAt: 1,
//           roles: 1,
//           isBlocked: 1,
//           profile: 1,
//         }
//       )
//         .skip(skip)
//         .limit(limit);

//       const total = await UserModel.countDocuments();

//       return { users, total };
//     } catch (error: any) {
//       console.error("Error fetching users:", error);
//       throw new Error("Error fetching users from database");
//     }
//   }

//   static async blockUser(email: string): Promise<boolean> {
//     try {
//       const response = await UserModel.findOneAndUpdate(
//         { email: email },
//         { isBlocked: true }
//       );

//       return true;
//     } catch (error: any) {
//       console.error("Error in blocking user in  repo:", error);
//     }
//   }

//   static async unblockUserRepo(email: string): Promise<boolean | void> {
//     try {
//       const response = await UserModel.findOneAndUpdate(
//         { email: email },
//         { isBlocked: false }
//       );
//       return true;
//     } catch (error: any) {
//       console.error("Error in blocking user in  repo:", error);
//     }
//   }

//   static async addTutorToUserModel(
//     email: string,
//     uniquePass: any
//   ): Promise<any | void> {
//     try {
//       const user = await UserModel.findOneAndUpdate(
//         { email: email },
//         {
//           $set: {
//             tutor: true,
//             tutorCredentials: {
//               email: email,
//               passwordHash: uniquePass,
//             },
//           },
//         },
//         {
//           new: true,
//           projection: {
//             _id: 0,
//             userId: 1,
//             firstName: 1,
//             lastName: 1,
//             email: 1,
//             phone: 1,
//             passwordHash: 1,
//             isBlocked: 1,
//             tutor: 1,
//           },
//         }
//       );
//       if (!user) {
//         throw new Error("User not found");
//       }
//       const userInfo = {
//         firstName: user.firstName,
//         lastName: user.lastName,
//         email: user.email,
//         userId: user.userId,
//         phone: user.phone,
//         isBlocked: user.isBlocked,
//         tutor: user.tutor,
//         tutorCredential: user.tutorCredentials,
//       };

//       const tutor = await TutorApplication.findOneAndUpdate(
//         { email: email },
//         {
//           $set: {
//             status: "accepted",
//           },
//         }
//       );
//       const updateData = {
//         email: user.email,
//         role: tutor?.tutorRole,
//         bio: tutor?.teachingExperience,
//         education: tutor?.degree,
//         experience: tutor?.subjectsOfExpertise,
//       };

//       const updatedProfile = await TutorProfile.findOneAndUpdate(
//         { userId: user._id },
//         { $set: updateData },
//         { new: true, upsert: true }
//       );

//       return userInfo;
//     } catch (err: any) {
//       console.error("Error in addTutorToUserModel:", err.message);
//       throw err;
//     }
//   }


}

export default UserRepositary;
