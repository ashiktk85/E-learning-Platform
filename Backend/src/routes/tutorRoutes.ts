import { Router } from "express";
import TutorContoller  from "../controllers/tutorController";

import multer from "multer";
import TutorService from "../services/tutorServices";
import UserRepositary from "../repository/userRepository";
import userModel from "../models/userModel";
import { Course } from "../models/courseModel";
import { CouresRepository } from "../repository/courseRepository";
import AdminRepository from "../repository/adminRepository";
import categoryModel from "../models/categoryModel";
import TutorApplication from "../models/applicationModel";
import Report from '../models/reportModel'
import TutorRepositary from "../repository/tutorRepositary";
// import { TutorServices } from "../services/tutorServices";
// import { verifyToken } from "../config/jwtConfig";
// import { UserController } from "../controllers/userController";

const route = Router();
const userRepository = new UserRepositary(userModel , Course)
const courseRepository = new CouresRepository()
const adminRepository = new AdminRepository(userModel,Course,categoryModel,TutorApplication ,Report)
const tutorRepositary = new TutorRepositary(userModel , Course)
const tutorService = new TutorService(userRepository,adminRepository,courseRepository,tutorRepositary);
const tutorController = new TutorContoller(tutorService);

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 * 1024, 
    fieldSize: 10 * 1024 * 1024,     
  },
});

const multerFields = [
    { name: 'idProof', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'certifications', maxCount: 10 },
];

 
route.post("/tutorapplication", upload.fields(multerFields),tutorController.tutorApplication.bind(tutorController));
route.post('/login', tutorController.verifyLogin.bind(tutorController))
route.get('/applicationdata/:email' , tutorController.getTutorDetails.bind(tutorController))
route.post('/editprofile' , tutorController.editProfile.bind(tutorController))
route.post('/create-course/:email', upload.any() ,tutorController.createCourse.bind(tutorController))
route.get('/get-courses/:email', tutorController.getCourses.bind(tutorController))
route.post('/kyc-verification/:email', tutorController.kycVerification.bind(tutorController))
route.get('/kyc-status/:email', tutorController.checkKyc.bind(tutorController))
// route.post('/uploadProfilePic',  upload.single("profilePic") ,tutorController.uploadProfile.bind(tutorController))

route.put('/updateCourse/:courseId' ,tutorController.updateCourse.bind(tutorController))
// route.post('/editThumbnail',  upload.single('thumbnail'), tutorController.updateThumbnail.bind(tutorController))
route.get('/tutorDashboard/:email', tutorController.getDashboard.bind(tutorController))
route.put('/updateVideo/:courseId', tutorController.editVideo.bind(tutorController))
route.delete('/deleteVideo', tutorController.deleteVideo.bind(tutorController))

route.post('/add-video/:sectionId', upload.single("file"), tutorController.addVideo.bind(tutorController))


// // charts
route.get('/chart', tutorController.ChartData.bind(tutorController))

export default route;
