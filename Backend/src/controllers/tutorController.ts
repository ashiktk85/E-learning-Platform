import { Request, Response } from "express";
import { TutorServices } from "../services/tutorServices";

export class TutorContoller {
    private tutorServices: TutorServices;

    constructor(tutorServices: TutorServices) {
        this.tutorServices = tutorServices;
    }

    async tutorApplication(req: Request, res: Response): Promise<void | boolean> {
        try {
            console.log("Inside Tutor Application Controller");

           
            const files = (req as any).files as {
                [fieldname: string]: Express.Multer.File[];
            };

            if (files) {
                console.log("Uploaded files:", files);
            } else {
                console.log("No files uploaded.");
            }

            console.log("Form data:", req.body);

            

            res.status(200).send({ success: true, message: "Application received" });
        } catch (err: any) {
            console.error("Error in tutor application controller:", err);
            res.status(500).send({ success: false, message: "Internal Server Error" });
        }
    }
}