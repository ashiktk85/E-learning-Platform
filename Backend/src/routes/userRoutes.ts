import { Router } from "express";
import { UserController } from "../controllers/userController";
import { UserService } from "../services/userServices";
import { verifyToken } from "../config/jwtConfig";
import { refreshTokenHandler } from "../config/refreshTokenVerify";
import { CourseAuth } from "../config/CourseAuth";
import multer from "multer";

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
route.put('/editUser', verifyToken, userController.editUser.bind(userController));
route.post('/save-userProfile', upload.single('profileImage'), userController.saveProfilePic.bind(userController));
route.get('/getProfile/:email' , userController.getProfile.bind(userController))
route.post('/refresh-token', refreshTokenHandler);

// Courses
route.get('/get-courses', userController.getCourses.bind(userController));
route.get("/getCourse/:id", userController.getCourseDetail.bind(userController));
route.post('/createorder', userController.coursePayment.bind(userController));
route.post('/saveCourse', userController.saveCourse.bind(userController));
route.get('/check-enrollment/:email/:courseId', CourseAuth, userController.checkEnrollement.bind(userController));
route.get('/mycourses/:userId', userController.MyCourses.bind(userController));

route.post('/add-rating/:userId', userController.addRating.bind(userController));
route.get(`/get-rating/:userId`, userController.getRating.bind(userController));

route.get('/tutorDetail/:id', userController.getTutorDetails.bind(userController))
route.post(`/walletAdd/:userId`,userController.addMoney.bind(userController))
route.get(`/getTransactions/:userId`, userController.getTransactions.bind(userController))


export default route;
