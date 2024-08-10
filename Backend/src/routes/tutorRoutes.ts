import { Router } from "express";
import { TutorContoller } from "../controllers/tutorController";
import { UserService } from "../services/userServices";
import multer from "multer";

const route = Router();

const tutorServices = new UserService();
const tutorController = new TutorContoller(tutorServices);

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multerFields = [
    { name: 'idProof', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 },
    { name: 'certifications', maxCount: 10 },
];

route.post("/tutorapplication",upload.fields(multerFields),tutorController.tutorApplication.bind(tutorController));

export default route;
