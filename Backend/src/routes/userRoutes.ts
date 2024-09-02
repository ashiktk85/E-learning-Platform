import { Router } from "express";

import { UserController } from "../controllers/userController";
import { UserService } from "../services/userServices";
import { verifyToken } from "../config/jwtConfig";
import { refreshTokenHandler } from "../config/refreshTokenVerify";

const route = Router()
const userService = new UserService();
const userController = new UserController(userService)


route.post('/signUp' , userController.createUser.bind(userController))
route.post('/otpVerification' ,userController.otpVerification.bind(userController))
route.post('/verifyLogin' , userController.verifyLogin.bind(userController))
route.post('/resendOtp' ,userController.resendOtp.bind(userController))
route.put('/editUser' ,userController.editUser.bind(userController) )
route.post('/refresh-token', refreshTokenHandler);

// courses 

route.get('/get-courses',userController.getCourses.bind(userController))
route.get("/getCourse/:id", userController.getCourseDetail.bind(userController))

export default route;



