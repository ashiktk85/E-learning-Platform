import Category from "../models/categoryModel";
import { Course } from "../models/courseModel";
import Report from "../models/reportModel";

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
    videoId: any,
    reason: any,
    additionalInfo: any,
    tutorName: string,
    courseName: string,
    reportId: string
  ) {
    try {
      const newReport = await new Report({
        courseId,
        videoId,
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
        videoId: report.videoId,
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

  static async getCourses() {
    try {
      const Courses = await Course.find({}).lean();

      return Courses;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async blockCourseRepo(courseId: string) {
    try {
        console.log(courseId ,"bb");
        
      const course = await Course.findOneAndUpdate(
        {courseId : courseId},
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
        {courseId : courseId},
        { isBlocked: false },
        { new: true }
      );

      if (!course) {
        throw new Error("Course dosent exist");
      }

      return  "unblocked";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
