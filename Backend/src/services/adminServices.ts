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

    async getUserListService(): Promise<void | any> {
        try {
            const getUsers = await UserRepositary.getUsersRepo();
            console.log("User data in service", getUsers);
    
           
            const cleanedUsers = getUsers.map((user: any) => {
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
    
            return cleanedUsers;
            
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

            console.log(uniquePass , data.email , uniqueId);
            

            const updateUser = await UserRepositary.addTutorToUserModel(data.email as string , uniqueId as string, uniquePass as any)
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

    async reportCourseService(courseId: any , videoId: any , reason: any , additionalInfo: any) {
        try {

            await adminRepository.saveReport(courseId , videoId , reason , additionalInfo)
            
        } catch (error : any) {
            console.error("Error during admin getting categories in service:", error.message);
            throw new Error(error.message);
        }
    }
}