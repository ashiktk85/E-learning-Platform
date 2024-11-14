import { Model } from 'mongoose';
import { IAdminRepository } from '../interfaces/admin.repository.interface';
import { BaseRepository } from '../repository/baseRepository';
import { IUser, ICourse, ICategory, ITutorApplication, IReport, ICleanedReport, IUserAggregationResult } from '../interfaces/common.interfaces';
import userModel from '../models/userModel';
import { Course } from '../models/courseModel';
import AdminTransaction from '../models/adminTransactions';

class AdminRepository implements IAdminRepository {
  private userRepo: BaseRepository<IUser>;
  private applicationRepo : BaseRepository<ITutorApplication>;
  private courseRepo: BaseRepository<ICourse>;
  private categoryRepo: BaseRepository<ICategory>;
  private reportRepo : BaseRepository<IReport>;

  constructor(
    userModel: Model<IUser>,
    courseModel: Model<ICourse>,
    categoryModel: Model<ICategory>,
    applicationModel : Model<ITutorApplication>,
    reportModel : Model<IReport>
  ) {
    this.userRepo = new BaseRepository(userModel);
    this.courseRepo = new BaseRepository(courseModel);
    this.categoryRepo = new BaseRepository(categoryModel);
    this.applicationRepo = new BaseRepository(applicationModel);
    this.reportRepo = new BaseRepository(reportModel);
  }

  async getUsers(page: number, limit: number): Promise<{ users: IUser[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const users = await this.userRepo.findAll({}, limit, skip);
      const total = await this.userRepo.countDocuments({});
      return { users, total };
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      throw new Error('Failed to fetch users. Please try again later.');
    }
  }

  async getTutors(page: number, limit: number): Promise<{ tutors: IUser[]; total: number }> {
    try {
      const skip = (page - 1) * limit;
      const tutors = await this.userRepo.findAll({tutor : true}, limit, skip);
      const total = await this.userRepo.countDocuments({tutor : true});
      return { tutors, total };
    } catch (error: any) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }

  async blockUser(email: string): Promise<boolean> {
    try {
        const findUser = await this.userRepo.find({ email: email });
        if (!findUser) {
            throw new Error('User not found');
        }
        console.log("block",findUser.isBlocked);
        if (findUser.isBlocked) {
            throw new Error('User is already blocked');
        }
        const updatedUser = await this.userRepo.update(
            { email: email },
            { $set: { isBlocked: true } }
        );
        if (!updatedUser) {
            throw new Error('User could not be blocked');
        }
        return true;
    } catch (error: any) {
        console.error('Error in blocking user in repository:', error.message);
        throw error
    }
}

async unBlockUser(email: string): Promise<boolean> {
    try {
        const findUser = await this.userRepo.find({ email: email });
        if (!findUser) {
            throw new Error('User not found');
        }
        console.log("unblock",findUser.isBlocked);
        
        if (!findUser.isBlocked) {
            throw new Error('User is already unblocked');
        }
        const updatedUser = await this.userRepo.update(
            { email: email },
            { $set: { isBlocked: false } }
        );
        if (!updatedUser) {
            throw new Error('User could not be unblocked');
        }

        return true;
    } catch (error: any) {
        console.error('Error in blocking user in repository:', error.message);
        throw error
    }
}

async getApplications(): Promise<ITutorApplication[]> {
    try {
        return await this.applicationRepo.findAll({});
    } catch (error: any) {
        console.error('Error in fetching tutor applications:', error.message);
        throw error
    }
}

async findApplication(id : string) : Promise<ITutorApplication | null> {
    try {
        return await this.applicationRepo.find({applicationId : id})
    } catch (error : any) {
        console.error('Error in fetching tutor application:', error.message);
        throw error
    }
}

async addTutorCredential(email : string , passcode : string) : Promise<boolean > {
    try {
       return await this.userRepo.update(
        {email : email} ,
        {
          $set: {
            tutor: true,
            tutorCredentials: {
              email: email,
              passwordHash: passcode,
            },
          },
        }
    )
    } catch (error : any) {
        console.error('Error in fetching tutor application:', error.message);
        throw error
    }
}



  async createCategory (categoryName: string, description: string): Promise<boolean> {
    try {
      const existCategory = await this.categoryRepo.find({ name: categoryName });
      if (existCategory) {
        throw new Error("Category already exists.");
      } 
      await this.categoryRepo.create({
        name: categoryName,
        description: description,
      })
      return true; 
    } catch (error: any) {
      console.error('Error in creating category in admin repo', error.message);
      throw error
    }
  }

   async getCategories(): Promise<ICategory[]> {
    try {
      return await this.categoryRepo.findAll({})
    } catch (error: any) {
      console.error('Error in finding categories in admin repo', error.message);
      throw error
    }
  }

   async saveReport(reportData : object) : Promise<boolean> {
    try {
        await this.reportRepo.create(reportData);
        return true;
    } catch (error: any) {
      console.error('Error in saving report in admin repo', error.message);
      throw error
    }
  }

  async getReports(skip: number, limit: number) : Promise <IReport[]> {
    try {
      const r = await this.reportRepo.findAll({} ,limit,skip )
      console.log(r);
      
      return r
    } catch (error: any) {
      console.error('Error in getting reports in admin repo', error.message);
      throw error
    }
  }

   async countReports() : Promise<number> {
    try {
      return await this.reportRepo.countDocuments()
    } catch (error: any) {
      console.error('Error in coutning reports in admin repo', error.message);
      throw error
    }
  }

   async getCourses(skip: number, limit: number) : Promise<{courses :ICourse[] , totalCourses : number}> {
    try {    
        const totalCourses = await this.courseRepo.countDocuments();
        const courses = await this.courseRepo.findAll({} , limit , skip)  
        return {
            courses,
            totalCourses,
        };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

   async reportDetail(reportId: string) : Promise<ICleanedReport> {
    try {
      const report = await this.reportRepo.find({ reportId: reportId });
      if (!report) {
        throw new Error("Report dosent exist");
      }
      const reportData : ICleanedReport = {
        reportId: report.reportId,
        courseId: report.courseId,
        reason: report?.reason,
        additionalInfo: report?.additionalInfo,
        status: report?.status,
        createdAt: report?.createdAt,
      };
      return reportData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }




   async blockCourse(courseId: string) : Promise<string> {
    try {
      const status = await this.courseRepo.update({ courseId: courseId }, { isBlocked: true })
      if (!status) {
        throw new Error("Course dosent exist");
      }
      return "blocked";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

   async unBlockCourse(courseId: string) : Promise<string> {
    try {
      const status = await this.courseRepo.update({ courseId: courseId }, { isBlocked: false })
      if (!status) {
        throw new Error("Course dosent exist");
      }
      return "unblocked";
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

   async getDasboard() : Promise<{users : number, courses : number, tutors : number}> {
    try {
      const users = await this.userRepo.countDocuments({isBlocked: false})
      const courses = await this.userRepo.countDocuments({isBlocked: false})
      const tutors = await this.userRepo.countDocuments({tutors : true ,isBlocked: false})
      return { users, courses, tutors };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async getUserAndTutorStatsByMonth(): Promise<IUserAggregationResult[]> {
    try {
        const result = await userModel.aggregate<IUserAggregationResult>([
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
        throw error;
    }
}


   async getTopTutors() : Promise<any> {
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
      throw error;
    }
  }

   async getTopCourses(): Promise<any> {
    try { 
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
      return topCourses; 
    } catch (error: any) {
      console.log("error in top 5 in admin rpo ", error.message); 
      throw error;
    }
  }

   

   async adminPaymentWallet (adminShare : any, data :any) : Promise<any> {
    try {
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

 

 export default AdminRepository;

