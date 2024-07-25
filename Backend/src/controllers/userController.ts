import { Request, Response } from "express";
import secret_key from "../config/jwtConfig";
import { UserService } from "../services/userServices";

export class UserController {
    private userService : UserService;

    constructor(userService : UserService) {
        this.userService = userService;
    }


    async createUser(req : Request , res : Response) : Promise<void> {
        try {

            console.log(req.body);
            console.log("secret key " , secret_key);

            const data = req.body;
            const user = await this.userService.signUp(data)
            
            res.status(201).json({ status : true });
            
            
        } catch (error) {
            console.log("Error in create user controller" , error);
            
        }
    }
}