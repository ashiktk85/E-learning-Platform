import { AwsConfig } from "../config/awsFileConfigs";
// import { createTutorId, createUniquePass } from "../helper/tutorCredentials";
// import sendTutorCredential from "../helper/tutorLoginMail";
// import Category from "../models/categoryModel";
// import userModel from "../models/userModel";
// import { TutorRepositary } from "../repository/tutorRepositary";
// import { UserRepositary } from "../repository/userRepository";
// import { adminRepository } from "../repository/adminRepository";
// import bcrypt from "bcrypt";
import { createRefreshToken, createToken } from "../config/jwtConfig";
// import { Course, ICourse } from "../models/courseModel";
import { v4 as uuidv4 } from "uuid";
// import { profile } from "console";
// import sendTutorLoginCredentials from "../helper/tutorMail";
import { IAdminServices } from "../interfaces/admin.service.interface";
import { IAdminRepository } from "../interfaces/admin.repository.interface";
import { FileUrl, ICategory, ICleanedUser, ICourse, IReport, IReportData, ITutorApplication, IUser, IUserAggregationResult } from "../interfaces/common.interfaces";
import getFolderPathByFileType from "../helper/filePathHandler";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { createUniquePass } from "../helper/tutorCredentials";
import sendTutorLoginCredentials from "../helper/tutorMail";
// import { ICategory, IReport, ITutorApplication, IUser } from "../interfaces/common.interfaces";

// require('dotenv').config();

const adminEmail = process.env.ADMIN_EMAIL!;
const adminPassword = process.env.ADMIN_PASS!;

class AdminServices implements IAdminServices {
  private adminRepository: IAdminRepository;
  private userRepository : IUserRepository;

  constructor(
    adminRepository: IAdminRepository,
    userRepository : IUserRepository
  ) {
    this.adminRepository = adminRepository;
    this.userRepository = userRepository;
  }
  aws = new AwsConfig();

  login = (email: string,password: string): { adminAccessToken: string; adminRefreshToken: string } => {
    try {
      if (email !== adminEmail) {
        throw new Error("Invalid email");
      } else if (password !== adminPassword) {
        throw new Error("Invalid password");
      }
      const adminAccessToken: string = createToken(email as string, "Admin");
      const adminRefreshToken: string = createRefreshToken(
        email as string,
        "Admin"
      );
      return { adminAccessToken, adminRefreshToken };
    } catch (error: any) {
      console.error("Error during admin login services:", error.message);
      throw error;
    }
  };

  getUsersList = async ( page: number,limit: number): Promise<{ users: ICleanedUser[]; total: number }> => {
    try {
      if (typeof page !== "number" || page < 1) {
        throw new Error("Invalid page number");
      }
      if (typeof limit !== "number" || limit < 1) {
        throw new Error("Invalid limit value");
      }
      const { users, total } = await this.adminRepository.getUsers(page, limit);
      const cleanedUsers: ICleanedUser[] = users.map((user: any) => {
        const {
          userId,
          firstName,
          lastName,
          email,
          phone,
          isBlocked,
          tutor,
          profileUrl
        } = user._doc;
        return {
          userId,
          firstName,
          lastName,
          email,
          phone,
          tutor,
          isBlocked,
          profileUrl
        };
      });
      return { users: cleanedUsers, total };
    } catch (error: any) {console.error("Error during admin getting users services:",error.message);
      throw error;
    }
  };

  getTutors = async (page: number,limit: number): Promise<{ tutors: ICleanedUser[]; total: number }> => {
    try {
      if (typeof page !== "number" || page < 1) {
        throw new Error("Invalid page number");
      }
      if (typeof limit !== "number" || limit < 1) {
        throw new Error("Invalid limit value");
      }
      const { tutors, total } = await this.adminRepository.getTutors(page, limit);
  
      const cleanedUsers = await Promise.all(
        tutors.map(async (user: any) => {
            const { firstName, lastName, email, phone, createdAt, roles, isBlocked, profile, userId, tutor } = user._doc;
            
            let profileUrl = "";
            if (profile) {
                profileUrl = await this.aws.getfile(profile as string, `users/profile/${userId}`);
            }

            return {
                firstName,
                lastName,
                email,
                phone,
                roles,
                isBlocked,
                profileUrl,
                createdAt: createdAt.toISOString().slice(0, 10),
                userId,
                tutor
            };
        })
    );

    console.log("Cleaned user data", cleanedUsers);

    return { tutors: cleanedUsers, total };
    } catch (error: any) {
      console.error("Error during admin getting users services:",error.message);
      throw error;
    }
  };

  blockUser = async(email : string) : Promise<boolean> => {
          try {
           return await this.adminRepository.blockUser(email)
          } catch (error : any) {
              console.error("Error during admin blocking user in  services:", error.message);
              throw error;
          }
   }

   unBlockUser = async(email : string) : Promise<boolean> => {
    try {
     return await this.adminRepository.unBlockUser(email)
    } catch (error : any) {
        console.error("Error during admin blocking user in  services:", error.message);
        throw error;
    }
}


       getApplications = async() : Promise <ITutorApplication[]> => {
          try {
             return await this.adminRepository.getApplications()
          } catch (error : any) {
              console.error("Error during admin getting  applications in  services:", error.message);
              throw error;
          }
      }

      findApplication = async (id: string): Promise<ITutorApplication> => {
        try {
            const response = await this.adminRepository.findApplication(id);  
            if (!response) {
                throw new Error('Application not found');
            }
            if (response.files) {
                const signedFiles = await Promise.all(
                    response.files.map(async (file: { type: string; url: string }) => {
                        const [uniqueName, ...rest] = file.url.split('-');
                        const folderPath = getFolderPathByFileType(file.type);
                        const signedUrl = await this.aws.getfile(file.url, folderPath);
                        return { signedUrl, ...file };
                    })
                );
                response.files = signedFiles as FileUrl[];
            }
            return response; 
        } catch (error: any) {
            console.error("Error during admin getting one applicant services:", error.message);
            throw error;
        }
    }
    

       acceptApplicaiton = async(id : string) : Promise<boolean> => {
          try {
              const application = await this.adminRepository.findApplication(id);
              const user = await this.userRepository.findUser(application?.email as string)
              const uniquePass = createUniquePass(6)
              const updateUser = await this.adminRepository.addTutorCredential(user.email as string ,  uniquePass as any)
              await sendTutorLoginCredentials(user.email as string, uniquePass as any)
              return updateUser;
          } catch (error : any) {
              console.error("Error during admin accepting  applicant services:", error.message);
              throw error;
          }
      }

      checkTutorStatus = async(email : string) : Promise <boolean | undefined> => {
          try {
              const response = await this.userRepository.findUser(email)
              return response?.tutor
          } catch (error : any) {
              console.error("Error during admin checking tutor status:", error.message);
              throw error;
          }
      }

       createCategory = async(categoryName : string, description :string) : Promise<boolean> => {
          try {
              return await this.adminRepository.createCategory(categoryName as string ,description as string)
          } catch (error : any) {
              console.error("Error during admin creating category in service:", error.message);
              throw error;
          }
      }

       getCategories = async() : Promise<ICategory[]> => {
          try {
               return await this.adminRepository.getCategories()
          } catch (error : any) {
              console.error("Error during admin getting categories in service:", error.message);
              throw error;
          }
      }

       reportCourse = async(courseId: string  , reason: string , additionalInfo: string) : Promise<boolean> => {
          try {
              const {name , email } = await this.userRepository.getCourse(courseId)
              const user = await this.userRepository.findUser(email)
              const tutorName =  user?.firstName + " " + user?.lastName
              const reportId = uuidv4()
              const reportData = {
                courseId,
                reason,
                additionalInfo,
                tutorName,
                courseName : name,
                reportId
              }
              return await this.adminRepository.saveReport(reportData)
          } catch (error : any) {
              console.error("Error during admin saving report in service:", error.message);
              throw error;
          }
      }

       getReports = async(page: number, limit: number) : Promise<{reports : IReport[] , totalPages : number}> => {
          try {
              const skip = (page - 1) * limit;
              console.log(limit, skip);
              
              const reports = await this.adminRepository.getReports(skip, limit);
              const totalReports = await this.adminRepository.countReports();
              const totalPages = Math.ceil(totalReports / limit);
              return { reports, totalPages };
          } catch (error: any) {
              console.error("Error during admin getting reports in service:", error.message);
              throw error;
          }
      }

      getCourses = async(page: number, limit: number): Promise<{ courses: any, totalCourses: number }> => {
        try {
            const skip = (page - 1) * limit;
            const response = await this.adminRepository.getCourses(skip, limit);
            
            const coursesWithUrls = await Promise.all(
                response.courses.map(async (course: any) => {
                    const thumbnails = course.thumbnail
                        ? await this.aws.getfile(
                            course.thumbnail,
                            `tutors/${course.email}/courses/${course.courseId}/thumbnail`
                        )
                        : null;
                    return {
                        _id: course._doc._id,
                        courseId: course._doc.courseId,
                        email: course._doc.email,
                        name: course._doc.name,
                        description: course._doc.description,
                        price: course._doc.price,
                        category: course._doc.category,
                        sections: course._doc.sections,
                        tags: course._doc.tags,
                        language: course._doc.language,
                        ratings: course._doc.ratings,
                        comments: course._doc.comments,
                        thumbnail: thumbnails,
                        isBlocked: course._doc.isBlocked,
                        users: course._doc.users,
                        averageRating: course._doc.averageRating,
                        totalRatings: course._doc.totalRatings,
                        createdAt: course._doc.createdAt
                    };
                })
            );
            return {
                courses: coursesWithUrls,
                totalCourses: response.totalCourses,
            };
        } catch (error: any) {
            console.error("Error during admin getting course detail in service:", error.message);
            throw error;
        }
    }
    
       reportDetail = async(reportId : string) : Promise<IReportData> => {
          try {
              const report = await this.adminRepository.reportDetail(reportId)
              const course = await this.userRepository.getCourse(report.courseId)
                const thumbnailUrl = await this.aws.getfile(
                  course?.thumbnail as string,
                  `tutors/${course.email}/courses/${course.courseId}/thumbnail`
              );
                const user = await this.userRepository.findUser(course?.email)
                if(!user) {
                  throw new Error("Cannot find user/tutor.")
                }
                  const reportData : IReportData = {
                      thumbnailUrl : thumbnailUrl,
                      tutorName : user.firstName+ " "+user.lastName,
                      courseName : course.name,
                      courseDescription : course.description,
                      tutorEmail : course.email,
                      users : course?.users,
                      report 
                  }
                  return reportData;
          } catch (error : any) {
              console.error("Error during admin getting report detail in service:", error.message);
              throw error;
          }
      }


    blockCourse = async(courseId : string) : Promise<string> => {
          try {
              return await this.adminRepository.blockCourse(courseId)
          } catch (error : any) {
              console.error("Error during blocking course  in service:", error.message);
              throw error;
          }
    }

    unBlockCourse = async(courseId : string): Promise<string> =>  {
          try {
              return await this.adminRepository.unBlockCourse(courseId)
          } catch (error : any) {
              console.error("Error during unblocking course  in service", error.message);
              throw error;
          }
    }

    getDashboard = async() : Promise<{dashboard:{users : number, courses : number, tutors : number}, barGraphData:IUserAggregationResult[]}> => {
          try {
              const dashboard = await this.adminRepository.getDasboard()
              const barGraphData = await this.adminRepository.getUserAndTutorStatsByMonth()
              console.log("Bargraph data",barGraphData);
             return {dashboard  , barGraphData}
          } catch (error : any) {
              console.error("Error during admin getting course detail in service:", error.message);
              throw error;
          }
    }

       getTopTutors = async() : Promise<IUser[]> => {
          try {
              const tutors = await this.adminRepository.getTopTutors();
              const updatedProfiles = await Promise.all(
                tutors.map(async (tutor : IUser) => {
                  const profileUrl = tutor.profile
                    ? await this.aws.getfile(tutor.profile, `users/profile/${tutor.userId}`)
                    : '';
                  return {
                    ...tutor,
                    profile: profileUrl
                  };
                })
              );
              return updatedProfiles;
          } catch (error : any) {
              console.error("Error during admin getting course detail in service:", error.message);
              throw error;
          }
      }

       getTopCourses = async() : Promise<ICourse[]> => {
          try {
            const topCourses = await this.adminRepository.getTopCourses()
            const withThumbnail = await Promise.all(
              topCourses.map(async (course : any) => {
                  const thumbnailUrl = await this.aws.getfile(course?.thumbnail ,
                       `tutors/${course.email}/courses/${course.courseId}/thumbnail`)
                  const profileUrl = course.userDetails?.profile ?
                   await this.aws.getfile(course?.userDetails?.profile ,
                      `users/profile/${course?.userDetails?.userId}`)
                  : ""
                       return {
                          ...course,
                          thumbnail : thumbnailUrl,
                          profile : profileUrl
                       }
              })
            )
            return withThumbnail;
          } catch (error : any) {
              console.error("Error during admin getting course detail in service:", error.message);
              throw error;
          }
      }
}

export default AdminServices;



