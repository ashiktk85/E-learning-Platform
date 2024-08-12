import { Request, Response } from "express";
import { AdminService } from "../services/adminServices";

export class AdminController {
    private adminService : AdminService;

    constructor (adminService : AdminService) {
        this.adminService = adminService
    }

    async adminLogin(req : Request , res : Response) : Promise<| void> {
        try {
            const {email , password} = req.body;
            console.log(email, password);
            const data = await this.adminService.adminLoginService(email , password);
            
            res.status(200).json({ message: "admin  Login successful", data });   
        } catch ( error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req : Request , res : Response) : Promise<any | void> {
        try {
            const userList = await this.adminService.getUserListService()
            console.log("user list contriller", userList);
            res.status(200).json(userList)
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async blockUser(req : Request , res : Response) : Promise<any | void> {
        try {
           const { email } = req.params
            const response = await this.adminService.blockUserService(email)
            console.log(response);

            res.status(200).json(response)
            
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    } 

    async unblockUser(req : Request , res : Response) : Promise<any | void> {
        try {
           const { email } = req.params
            const response = await this.adminService.unblockeUserService(email)
            console.log(response);

            res.status(200).json(response)
            
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    } 
}