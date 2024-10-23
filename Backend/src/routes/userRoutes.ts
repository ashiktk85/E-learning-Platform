import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userServices";
import { verifyToken } from "../config/jwtConfig";
import { refreshTokenHandler } from "../config/refreshTokenVerify";
import { CourseAuth } from "../config/CourseAuth";
import multer from "multer";
import userAuth from "../config/userAuth";

const route = Router();
const userService = new UserService();
const userController = new UserController(userService);

const storage = multer.memoryStorage();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,  
    },
});

route.post('/signUp', userController.createUser.bind(userController));
route.post('/otpVerification', userController.otpVerification.bind(userController));
route.post('/verifyLogin', userController.verifyLogin.bind(userController));
route.post('/resendOtp', userController.resendOtp.bind(userController));
route.put('/editUser', verifyToken ,userAuth, userController.editUser.bind(userController));
route.post('/save-userProfile',verifyToken,userAuth, upload.single('profileImage'), userController.saveProfilePic.bind(userController));
route.get('/getProfile/:email' ,verifyToken ,userAuth, userController.getProfile.bind(userController))
route.post('/refresh-token', refreshTokenHandler);

// Courses
route.get('/get-courses', userController.getCourses.bind(userController));
route.get("/getCourse/:id",verifyToken,userAuth, userController.getCourseDetail.bind(userController));
route.post('/createorder', userController.coursePayment.bind(userController));
route.post('/saveCourse', verifyToken ,userAuth, userController.saveCourse.bind(userController));
route.get('/check-enrollment/:email/:courseId', CourseAuth, userController.checkEnrollement.bind(userController));
route.get('/mycourses/:userId',userAuth , userController.MyCourses.bind(userController));


route.get('/tutorDetail/:id', userController.getTutorDetails.bind(userController))
route.post(`/walletAdd/:userId`,verifyToken ,userAuth,userController.addMoney.bind(userController))
route.get(`/getTransactions/:userId`, userController.getTransactions.bind(userController))
route.get('/ratings/:courseId', verifyToken ,userAuth,userController.getRatings.bind(userController))
route.get('/get-orders/:userId', verifyToken ,userAuth ,  userController.getOrders.bind(userController))


export default route;
