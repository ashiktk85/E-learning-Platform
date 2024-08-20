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

            const data = req.body

            await this.tutorServices.tutorApplicationService(files , data)

            

            res.status(200).send({ success: true, message: "Application received" });
        } catch (err: any) {
            console.error("Error in tutor application controller:", err);
            res.status(500).send({ success: false, message: "Internal Server Error" });
        }
    }

    async verifyLogin(req : Request , res : Response) : Promise <any | void> {
        try {
            
            const {applicationId , passcode} = req.body;

            console.log(applicationId , passcode);
            const response = await this.tutorServices.verifyLoginService(applicationId as string, passcode as string)

            if(response) {
                res.status(200).json(response)
            }  
        } catch (error : any) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
    }

    async getTutorDetails(req : Request, res : Response) : Promise <any > {
        try {

            const { email } = req.params;
            const response = await this.tutorServices.getApplicationDataService(email as string)

            res.status(200).json(response)
            
        } catch (error : any) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
    }

    async editProfile (req :Request , res : Response) :  Promise<any | void>{
        try {
            
            const data = req.body;
            console.log(data);
            
            const response = await this.tutorServices.editProfileService(data as any)

            res.status(200).json(response)
        } catch (error : any) {
            console.error(error.message);
            res.status(500).json({ message: error.message });
        }
    }
}
