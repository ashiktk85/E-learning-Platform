import { AwsConfig } from "../config/awsFileConfigs";
import { createTutorId, createUniquePass } from "../helper/tutorCredentials";
import sendTutorCredential from "../helper/tutorLoginMail";
import Category from "../models/categoryModel";
import userModel from "../models/userModel";
import { TutorRepositary } from "../repository/tutorRepositary";
import { UserRepositary } from "../repository/userRepository";
import { adminRepository } from "../repository/adminRepository";
import bcrypt from "bcrypt";
import { createToken } from "../config/jwtConfig";
import { Course, ICourse } from "../models/courseModel";
import { v4 as uuidv4 } from "uuid";
import { profile } from "console";

require('dotenv').config();

const adminEmail = process.env.ADMIN_EMAIL!
const adminPassword = process.env.ADMIN_PASS!


 
export class AdminService {
     aws = new AwsConfig()

    async adminLoginService(email : string, password : string) : Promise<{adminInfo : string} | void | any> {
        try {
            console.log("dfsdfsdfs",adminEmail, adminPassword);
            if(email !== adminEmail) {
                throw new Error("Invalid email")
            }  else if(password !== adminPassword) {
                throw new Error("Invalid password")
            } 
            const adminInfo = {
                email
            }

            const accessToken = createToken(email as string, "Admin");
            console.log(adminInfo , "admin info");
            return adminInfo;
        } catch (error : any) {
            console.error("Error during admin login services:", error.message);
            throw new Error(error.message);
        }
    }


async getUserListService(page: number, limit: number): Promise<{ users: any[]; total: number }> {
    try {
        const { users, total } = await UserRepositary.getUsersRepo(page, limit);
        console.log("User data in service", users);

        const cleanedUsers = users.map((user: any) => {
            const { firstName, lastName, email, phone, createdAt, roles, isBlocked } = user._doc;
            return {
                firstName,
                lastName,
                email,
                phone,
                roles,
                isBlocked,
                createdAt: createdAt.toISOString().slice(0, 10),
            };
        });

        console.log("Cleaned user data", cleanedUsers);

        return { users: cleanedUsers, total };
    } catch (error: any) {
        console.error("Error during admin getting users services:", error.message);
        throw new Error(error.message);
    }
}

async getTutorsService(page: number, limit: number): Promise<{ users: any[]; total: number }> {
    try {
        const { users, total } = await UserRepositary.getTutorsRepo(page, limit);
        console.log("User data in service", users);

       
        const cleanedUsers = await Promise.all(
            users.map(async (user: any) => {
                const { firstName, lastName, email, phone, createdAt, roles, isBlocked, profile, userId } = user._doc;
                
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
                    userId
                };
            })
        );

        console.log("Cleaned user data", cleanedUsers);

        return { users: cleanedUsers, total };
    } catch (error: any) {
        console.error("Error during admin getting users services:", error.message);
        throw new Error(error.message);
    }
}

    
    async blockUserService(email : string) : Promise<boolean | void> {
        try {

            const response = await UserRepositary.blockUser(email)

            return response;
            
        } catch (error : any) {
            console.error("Error during admin blocking user in  services:", error.message);
            throw new Error(error.message);
        }
    }

    async unblockeUserService(email : string) : Promise<boolean | void> {
        try {

            const response = await UserRepositary.unblockUserRepo(email)

            return response;
            
        } catch (error : any) {
            console.error("Error during admin blocking user in  services:", error.message);
            throw new Error(error.message);
        }
    }

    async getApplicationService() : Promise <any | void> {
        try {
            const response = await TutorRepositary.getApplicationsRepo()

            return response
            
        } catch (error : any) {
            console.error("Error during admin getting  applications in  services:", error.message);
            throw new Error(error.message);
        }
    }

    async getOneApplicationService(id: string): Promise<any | void> {
        try {
            const response = await TutorRepositary.getOneApplication(id);
    
            if (response && response.files) {
                const signedFiles = await Promise.all(
                    response.files.map(async (file: { type: string, url: string }) => {
                        const [uniqueName, ...rest] = file.url.split('-');
                        const folderPath = this.getFolderPathByFileType(file.type);
                        const signedUrl = await this.aws.getfile(file.url, folderPath);
                        return { ...file, signedUrl };
                    })
                );
                
                response.files = signedFiles;
                console.log(signedFiles, "signed");
            }
    
            return response;
    
        } catch (error: any) {
            console.error("Error during admin getting one applicant services:", error.message);
            throw new Error(error.message);
        }
    }
    
    

    private getFolderPathByFileType(fileType: string): string {
        switch (fileType) {
            case 'idProof':
                return 'tutorApplication/idProofs';
            case 'resume':
                return 'tutorApplication/resume';
            case 'certification':
                return 'tutorApplication/certifications';
            default:
                throw new Error(`Unknown file type: ${fileType}`);
        }
    }

    async acceptApplicaiton(id : string) {
        try {

            const data = await TutorRepositary.getOneApplication(id)


            const user = await UserRepositary.existUser(data.email)

            const firstName = user?.firstName;

            const uniqueId = createTutorId(firstName as string)

            const uniquePass = createUniquePass(6)


           

            // sendTutorCredential(data.email as string , uniqueId as string, uniquePass as string)
            // const saltRounds: number = 10;
            // const hashedPassword =await bcrypt.hash(uniquePass as string, saltRounds)

            console.log(uniquePass , data.email );
            

            const updateUser = await UserRepositary.addTutorToUserModel(data.email as string ,  uniquePass as any)
            // const tutorProfile = await 
            console.log(updateUser , "services");
            
            return updateUser;
            
        } catch (error : any) {
            console.error("Error during admin accepting  applicant services:", error.message);
            throw new Error(error.message);
        }
    }

    async checkStatus(email : string) : Promise <boolean | void> {
        try {
            
            const response = await UserRepositary.existUser(email)

            console.log(response, "checking status");

            if(response?.tutor === true) {
                return true
            } else {
                return false
            }
            

        } catch (error : any) {
            console.error("Error during admin checking tutor status:", error.message);
            throw new Error(error.message);
        }
    }

    async createCategoryService(categoryName : string, description :string) : Promise<any> {
        try {

            const response = await adminRepository.createCategory(categoryName as string ,description as string) 
            return response;
        } catch (error : any) {
            console.error("Error during admin creating category in service:", error.message);
            throw(error.message);
        }
    }

    async getCategoriesService() : Promise<any> {
        try {
            
            const response = await adminRepository.getCategoriesRepo()
            return response;

        } catch (error : any) {
            console.error("Error during admin getting categories in service:", error.message);
            throw new Error(error.message);
        }
    }

    async reportCourseService(courseId: any  , reason: any , additionalInfo: any) {
        try {
            const coures = await UserRepositary.getCourse(courseId)
            if(!coures) {
                throw new Error("Cannot find course.")
              }

              const user = await UserRepositary.existUser(coures?.email)

              if(!user) {
                throw new Error("Cannot find user/tutor.")
              }
            const tutorName =  user?.firstName + " " +user?.lastName
            const courseName = coures?.name

            const reportId = uuidv4()

            const res = await adminRepository.saveReport(courseId  , reason , additionalInfo , tutorName , courseName , reportId)

          return res;
            
        } catch (error : any) {
            console.error("Error during admin saving report in service:", error.message);
            throw new Error(error.message);
        }
    }

    async getReportService(page: number, limit: number) {
        try {
            const skip = (page - 1) * limit;
            const reports = await adminRepository.getReports(skip, limit);
            const totalReports = await adminRepository.countReports();
            const totalPages = Math.ceil(totalReports / limit);
            return { reports, totalPages };
        } catch (error: any) {
            console.error("Error during admin getting reports in service:", error.message);
            throw new Error(error.message);
        }
    }
    

    async reportDetail(reportId : string) {
        try {
            const awsConfig = new AwsConfig();
            const report = await adminRepository.reportDetail(reportId)

            const coures = await UserRepositary.getCourse(report.courseId)
            if(!coures) {
                throw new Error("Cannot find course.")
              }

              const thumbnailUrl = await awsConfig.getfile(
                coures?.thumbnail as string,
                `tutors/${coures.email}/courses/${coures.courseId}/thumbnail`
            );

              const user = await UserRepositary.existUser(coures?.email)

              if(!user) {
                throw new Error("Cannot find user/tutor.")
              }

            
                const reportData = {
                    thumbnailUrl : thumbnailUrl,
                    tutorName : user.firstName+ " "+user.lastName,
                    coureName : coures.name,
                    courseDescripiton : coures.description,
                    tutorEmail : coures.email,
                    users : coures?.users,
                    report
                }

                return reportData;
              

        } catch (error : any) {
            console.error("Error during admin getting report detail in service:", error.message);
            throw new Error(error.message);
        }
    } 


    async getCourses(page: number, limit: number) {
        try {
          
            const skip = (page - 1) * limit;
    
           
            const response = await adminRepository.getCourses(skip, limit);
    
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
                totalCourses: response.totalCourses,
            };
        } catch (error: any) {
            console.error("Error during admin getting course detail in service:", error.message);
            throw new Error(error.message);
        }
    }
    

    async blockCourseService(courseId : string) {
        try {
            const res = await adminRepository.blockCourseRepo(courseId)
            return res;
        } catch (error : any) {
            console.error("Error during admin getting course detail in service:", error.message);
            throw new Error(error.message);
        }
    }

    async unBlockCourseService(courseId : string) {
        try {
            const res = await adminRepository.unBlockCourseRepo(courseId)
            return res;
        } catch (error : any) {
            console.error("Error during admin getting course detail in service:", error.message);
            throw new Error(error.message);
        }
    }

    async getDashboardService() {
        try {
            const dashboard = await adminRepository.getDasboard()
            const barGraphData = await adminRepository.getUserAndTutorStatsByMonth()
            console.log(barGraphData);
            
           return {dashboard  , barGraphData}
            
        } catch (error : any) {
            console.error("Error during admin getting course detail in service:", error.message);
            throw new Error(error.message);
        }
    }

    async getTopTutorsService() {
        try {
            const awsConfig = new AwsConfig();
            const tutors = await adminRepository.topTutors();
            
            const updatedProfiles = await Promise.all(
              tutors.map(async (tutor) => {
                const profileUrl = tutor.profile 
                  ? await awsConfig.getfile(tutor.profile, `users/profile/${tutor.userId}`) 
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
            throw new Error(error.message);
        }
    }

    async getTopCourseServices() {
        try {
         const awsConfig = new AwsConfig();
          const topCourses = await adminRepository.getTopCourses()

          const withThumbnail = await Promise.all(
            topCourses.map(async (course) => {
                const thumbnailUrl = await awsConfig.getfile(course?.thumbnail ,
                     `tutors/${course.email}/courses/${course.courseId}/thumbnail` )

                const profileUrl = course.userDetails?.profile ? 
                 await awsConfig.getfile(course?.userDetails?.profile ,
                    `users/profile/${course?.userDetails?.userId}`
                )
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
            throw new Error(error.message);
        }
    }

    

    
    

    
}