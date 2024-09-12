import { Router } from "express";

import { UserController } from "../controllers/userController";
import { UserService } from "../services/userServices";
import { verifyToken } from "../config/jwtConfig";
import { refreshTokenHandler } from "../config/refreshTokenVerify";
import { userAuth } from "../config/userAuth";

const route = Router()
const userService = new UserService();
const userController = new UserController(userService)


route.post('/signUp' , userController.createUser.bind(userController))
route.post('/otpVerification' ,userController.otpVerification.bind(userController))
route.post('/verifyLogin' , userController.verifyLogin.bind(userController))
route.post('/resendOtp' ,userController.resendOtp.bind(userController))
route.put('/editUser' ,userAuth ,verifyToken,userController.editUser.bind(userController) )
route.post('/refresh-token', refreshTokenHandler);

// courses 

route.get('/get-courses',userAuth,userController.getCourses.bind(userController))
route.get("/getCourse/:id" ,userAuth, userController.getCourseDetail.bind(userController))
route.post('/createorder',userAuth, userController.coursePayment.bind(userController))
route.post('/saveCourse',userAuth, userController.saveCourse.bind(userController))
route.get('/check-enrollment/:email/:courseId' ,userAuth, userController.checkEnrollement.bind(userController))
route.get('/mycourses/:userId',userAuth, userController.MyCourses.bind(userController))





export default route;

    

