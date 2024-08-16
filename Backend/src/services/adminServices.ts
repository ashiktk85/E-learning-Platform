import { AwsConfig } from "../config/awsFileConfigs";
import userModel from "../models/userModel";
import { TutorRepositary } from "../repository/tutorRepositary";
import { UserRepositary } from "../repository/userRepository";

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


          

            
        } catch (error : any) {
            console.error("Error during admin accepting  applicant services:", error.message);
            throw new Error(error.message);
        }
    }
}