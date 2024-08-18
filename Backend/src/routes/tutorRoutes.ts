import { Router } from "express";
import { TutorContoller } from "../controllers/tutorController";

import multer from "multer";
import { TutorServices } from "../services/tutorServices";

const route = Router();

const tutorServices = new TutorServices();
const tutorController = new TutorContoller(tutorServices);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multerFields = [
    { name: 'idProof', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    // { name: 'profilePhoto', maxCount: 1 },
    { name: 'certifications', maxCount: 10 },
];



route.post("/tutorapplication",upload.fields(multerFields),tutorController.tutorApplication.bind(tutorController));
route.post('/login', tutorController.verifyLogin.bind(tutorController))

export default route;
