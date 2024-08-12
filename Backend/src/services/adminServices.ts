import userModel from "../models/userModel";
import { UserRepositary } from "../repository/userRepository";

require('dotenv').config();

const adminEmail = process.env.ADMIN_EMAIL!
const adminPassword = process.env.ADMIN_PASS!


export class AdminService {

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
}