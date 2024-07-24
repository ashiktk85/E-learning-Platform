import { Request, Response } from "express";

export class UserController {

    async createUser(req : Request , res : Response) : Promise<void> {
        try {

            console.log(req.body);
            res.status(201).json({ message: "User created successfully" });
            
            
        } catch (error) {
            console.log("Error in create user controller" , error);
            
        }
    }
}