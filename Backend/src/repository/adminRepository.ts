import AdminTransaction from "../models/adminTransactions";
import Category from "../models/categoryModel";
import { Course } from "../models/courseModel";
import Report from "../models/reportModel";
import userModel from "../models/userModel";
import { CouresRepository } from "./courseRepository";

export class adminRepository {
  static async createCategory(
    categoryName: string,
    description: string
  ): Promise<any | void> {
    try {
      const existCategory = await Category.findOne({ name: categoryName });
      console.log("exist cate", existCategory);

      if (existCategory) {
        throw new Error("Category already exists.");
      } else {
        const newCategory = new Category({
          name: categoryName,
          description: description,
        });
        const response = await newCategory.save();
        return true;
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCategoriesRepo(): Promise<any> {
    try {
      const categories = await Category.find({});
      return categories;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async saveReport(
    courseId: any,
    reason: any,
    additionalInfo: any,
    tutorName: string,
    courseName: string,
    reportId: string
  ) {
    try {
      const newReport = await new Report({
        courseId,
        reason,
        additionalInfo,
        courseName,
        tutorName,
        reportId,
      });

      const savedReport = await newReport.save();
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getReports(skip: number, limit: number) {
    try {
      const reports = await Report.find({}).skip(skip).limit(limit).exec();
      return reports;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async countReports() {
    try {
      const count = await Report.countDocuments().exec();
      return count;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async reportDetail(reportId: string) {
    try {
      const report = await Report.findOne({ reportId: reportId });

      if (!report) {
        throw new Error("Report dosent exist");
      }

      const reportData = {
        reportId: report.reportId,
        courseId: report.courseId,
        reason: report?.reason,
        additionalIndo: report?.additionalInfo,
        status: report?.status,
        createdAt: report?.createdAt,
      };

      return reportData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getCourses(skip: number, limit: number) {
    try {
        
      const totalCourses = await Course.countDocuments();
        const courses = await Course.find({}).skip(skip).limit(limit).lean();

        

        return {
            courses,
            totalCourses,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}


  static async blockCourseRepo(courseId: string) {
    try {
      console.log(courseId, "bb");

      const course = await Course.findOneAndUpdate(
        { courseId: courseId },
        { isBlocked: true },
        { new: true }
      );

      if (!course) {
        throw new Error("Course dosent exist");
      }

      return "blocked";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async unBlockCourseRepo(courseId: string) {
    try {
      const course = await Course.findOneAndUpdate(
        { courseId: courseId },
        { isBlocked: false },
        { new: true }
      );

      if (!course) {
        throw new Error("Course dosent exist");
      }

      return "unblocked";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getDasboard() {
    try {
      const users = await userModel.find({ isBlocked: false }).countDocuments();
      const courses = await Course.find({ isBlocked: false }).countDocuments();
      const tutors = await userModel
        .find({ isBlocked: false, tutor: true })
        .countDocuments();

      return { users, courses, tutors };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async topTutors() {
    try {
      const topTutorsByStudents = await userModel.aggregate([
        { $match: { tutor: true } },
        {
          $lookup: {
            from: "courses",
            localField: "email",
            foreignField: "email",
            as: "courses",
          },
        },
        {
          $unwind: "$courses",
        },
        {
          $addFields: {
            studentCount: { $size: "$courses.users" },
          },
        },
        {
          $group: {
            _id: "$_id",
            totalStudents: { $sum: "$studentCount" },
            totalCourses: { $sum: 1 },
            name: { $first: "$firstName" },
            email: { $first: "$email" },
            profile: { $first: "$profile" },
            userId: { $first: "$userId" },
          },
        },
        { $sort: { totalStudents: -1 } },
        { $limit: 5 },
      ]);

      return topTutorsByStudents;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getTopCourses() {
    try {
      console.log("rep");
      
      const topCourses = await Course.aggregate([
        {
          $addFields: {
            enrolledCount: { $size: "$users" } 
          }
        },
        {
          $sort: { enrolledCount: -1 } 
        },
        {
          $limit: 5 
        },
        {
          $lookup: {
            from: 'users', 
            localField: 'email', 
            foreignField: 'email',
            as: 'userDetails' 
          }
        },
        {
          $unwind: '$userDetails' 
        },
        {
          $project: {
            _id: 1, 
            name: 1, 
            email: 1,
            courseId: 1,
            enrolledCount: 1, 
            totalRatings: 1,
            averageRating: 1,
            thumbnail: 1,
            'userDetails.profile': 1 ,
            'userDetails.userId' : 1,
            'userDetails.firstName' :1
          }
        }
      ]);
      
      console.log(topCourses);
      
      return topCourses;
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getUserAndTutorStatsByMonth () {
    try {
      console.log("rep");
      
      const result = await userModel.aggregate([
        {
          
          $project: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            tutor: 1,
          },
        },
        {
          
          $group: {
            _id: { year: "$year", month: "$month" },
            totalUsers: { $sum: 1 },
            totalTutors: { $sum: { $cond: [{ $eq: ["$tutor", true] }, 1, 0] } },
          },
        },
        {
          
          $sort: { "_id.year": 1, "_id.month": 1 },
        },
      ]);
    
      return result;
      
      
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async adminPaymentWallet (adminShare : any, data :any) {
    try {
     console.log(data)
      const transactionData = {
        transactionId : data.transactionId,
        amount : adminShare,
        course : {
          courseId : data.courseId,
          courseName : data.course, 
        tutor : {
          tutorId : data.tutorId,
          tutorName : data.tutor
        }
      },
      status : 'completed',
      }

      const transaction =  new AdminTransaction(transactionData)
      await transaction.save()
      
    } catch (error : any) {
      console.log("error in saving admin share", error.message);
      throw new (error.message)
    }
  }
}

