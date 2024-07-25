import { Router } from "express";

import { UserController } from "../controllers/userController";
import { UserService } from "../services/userServices";


const route = Router()
const userService = new UserService();
const userController = new UserController(userService)


route.post('/signUp' , userController.createUser.bind(userController))

export default route;



