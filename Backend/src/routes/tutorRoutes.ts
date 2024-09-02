import { Router } from "express";
import { TutorContoller } from "../controllers/tutorController";

import multer from "multer";
import { TutorServices } from "../services/tutorServices";
import { verifyToken } from "../config/jwtConfig";

const route = Router();

const tutorServices = new TutorServices();
const tutorController = new TutorContoller(tutorServices);

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

export default route;
