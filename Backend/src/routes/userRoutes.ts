import { Router } from "express";

import { UserController } from "../controllers/userController";
import { UserService } from "../services/userServices";


const route = Router()
const userService = new UserService();
const userController = new UserController(userService)


route.post('/signUp' , userController.createUser.bind(userController))
route.post('/otpVerification' ,userController.otpVerification.bind(userController))
route.post('/verifyLogin' , userController.verifyLogin.bind(userController))
route.post('/resendOtp' ,userController.resendOtp.bind(userController))
route.put('/editUser',userController.editUser.bind(userController) )

export default route;



