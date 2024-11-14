import { Request, Response } from "express";
import { IAdminServices } from "../interfaces/admin.service.interface";
import HTTP_statusCode from "../Enums/httpStatusCode";

 class AdminController {
    private adminService : IAdminServices;

    constructor (adminService : IAdminServices) {
        this.adminService = adminService
    }

     login = async(req : Request , res : Response) => {
        try {
            const {email , password} = req.body;
            console.log("admin login details",email, password);
            const serviceResponse = await this.adminService.login(email , password)
            
            res.cookie("AdminRefreshToken", serviceResponse.adminRefreshToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
             });
             res.cookie("AdminAccessToken", serviceResponse.adminAccessToken, {
                httpOnly: true,
                sameSite: 'none',
                secure: true,
                maxAge: 15 * 60 * 1000,
             });
             res.status(HTTP_statusCode.OK).send(serviceResponse);   
        } catch ( error : any) {
           console.log("Admin := login error",error);
           if(error.message === "Invalid email") {
                res.status(HTTP_statusCode.NotFound).json({message : "Email is wrong"})
           } else if(error.message === "Invalid password") {
            res.status(HTTP_statusCode.NotFound).json({message : "password is wrong"})
       }
        }
    }

    getUsers = async(req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1; 
        const limit = parseInt(req.query.limit as string, 10) || 10; 
        const { users, total } = await this.adminService.getUsersList(page, limit);
        res.status(200).json({
            users,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        console.log("Admin := getusers error",error);
        if(error.message === 'Invalid page number') {
            res.status(HTTP_statusCode.BadRequest).json({message : "Invalid page number"})
        } else if (error.message === 'Invalid limit value') {
            res.status(HTTP_statusCode.BadRequest).json({message : 'Invalid limit value'})
        }
        res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
    }
}

    getTutors = async(req: Request, res: Response) => {
    try {
        const page = parseInt(req.query.page as string, 10) || 1; 
        const limit = parseInt(req.query.limit as string, 10) || 10; 
        const { tutors, total } = await this.adminService.getTutors(page, limit);
        res.status(200).json({
            tutors,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error: any) {
        console.log("Admin := getusers error in controller",error);
        if(error.message === 'Invalid page number') {
            res.status(HTTP_statusCode.BadRequest).json({message : "Invalid page number"})
        } else if (error.message === 'Invalid limit value') {
            res.status(HTTP_statusCode.BadRequest).json({message : 'Invalid limit value'})
        }
        res.status(500).json({ message: error.message });
    }
    }


     blockUser = async(req : Request , res : Response) => {
        try {
           const { email } = req.params 
            const status = await this.adminService.blockUser(email)
            res.status(HTTP_statusCode.updated).json(status)
        } catch (error : any) {
            console.log("Admin := getusers error in controller",error);
            if(error.message === 'User not found') {
                res.status(HTTP_statusCode.NotFound).json({message : 'User not found'})
            } else if(error.message === 'User is already blocked') {
                res.status(HTTP_statusCode.NotFound).json({message : 'User is already blocked'})
            }
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    } 

    unblockUser = async(req : Request , res : Response) => {
        try {
           const { email } = req.params 
            const status = await this.adminService.unBlockUser(email)
            res.status(HTTP_statusCode.updated).json(status)
        } catch (error : any) {
            console.log("Admin := getusers error in controller",error);
            if(error.message === 'User not found') {
                res.status(HTTP_statusCode.NotFound).json({message : 'User not found'})
            } else if(error.message === 'User is already unblocked') {
                res.status(HTTP_statusCode.NotFound).json({message : 'User is already unblocked'})
            }
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    } 



     getApplications = async(req : Request , res : Response) => {
        try {
            const getApplications = await this.adminService.getApplications()
            res.status(HTTP_statusCode.OK).json(getApplications)        
        } catch (error : any ) {
            console.log("Admin := getusers error in controller",error);
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     findApplication = async(req : Request , res : Response) => {
        try {
            const {id} =  req.params;
            const applicant = await this.adminService.findApplication(id)
            res.status(HTTP_statusCode.OK).json(applicant)
        } catch (error : any) {
            console.log("Admin := getusers error in controller",error);
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     acceptApplication = async(req : Request , res : Response) => {
        try {
            const { id } = req.params;
            const response  = await this.adminService.acceptApplicaiton(id)       
            res.status(HTTP_statusCode.updated).json(response)   
        } catch (error : any) {
            console.log("Admin := getusers error in controller",error);
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     checkTutorStatus= async(req : Request , res : Response) =>  {
        try {
            const { email } = req.params
            const response  = await this.adminService.checkTutorStatus(email)
            res.status(HTTP_statusCode.OK).json(response)       
        } catch (error :any) {
            console.log("Admin := getusers error in controller",error);
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     createCategory = async(req : Request , res :Response) => {
        try {
            const {categoryName , description} = req.body
            const response = await this.adminService.createCategory(categoryName as string , description as string)
            res.status(HTTP_statusCode.updated).json(response)
        } catch ( error : any) {
            console.log("Admin := getusers error in controller",error);
            if (error.message === "Category already exists.") {
                return res.status(HTTP_statusCode.Conflict).json({ message: error.message });
            }
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     getCategories = async(req : Request , res : Response) => {
        try {
            const response = await this.adminService.getCategories()
            res.status(HTTP_statusCode.OK).json(response)   
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

    reportCourse = async(req : Request , res :Response) => {
        try {
          const  {courseId  ,reason ,additionalInfo} = req.body;
          const report = await this.adminService.reportCourse(courseId  , reason , additionalInfo)
          res.status(HTTP_statusCode.updated).json(report)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

    getReports = async(req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const { reports, totalPages } = await this.adminService.getReports(page, limit);
            res.status(HTTP_statusCode.OK).json({ reports, totalPages });
        } catch (error: any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

    getCourses = async(req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const { courses, totalCourses } = await this.adminService.getCourses(page, limit);
            const totalPages = Math.ceil(totalCourses / limit);
            res.status(HTTP_statusCode.OK).json({ courses, totalPages });
        } catch (error: any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     reportDetail = async(req : Request , res :Response) => {
        try {
            const {reportId} = req.params
            const report = await this.adminService.reportDetail(reportId)
            res.status(HTTP_statusCode.OK).json(report)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     blockCourse = async(req : Request , res :Response) =>  {
        try {
            const { courseId } = req.params;
            const response = await this.adminService.blockCourse(courseId)
            res.status(HTTP_statusCode.updated).json(response)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     unBlockCourse = async(req : Request , res :Response) => {
        try { 
            const { courseId } = req.params;
            const response = await this.adminService.unBlockCourse(courseId)
            res.status(HTTP_statusCode.updated).json(response)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     getDashboard = async(req : Request , res :Response) => {
        try {
            const dashboard = await this.adminService.getDashboard()
            res.status(HTTP_statusCode.OK).json(dashboard)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     getTopTutors = async(req : Request , res :Response) => {
        try {
            const topTutors = await this.adminService.getTopTutors()
            res.status(HTTP_statusCode.OK).json(topTutors)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

     getTopCourses = async(req : Request , res :Response) => {
        try {  
            const topCourses = await this.adminService.getTopCourses() 
            res.status(HTTP_statusCode.OK).json(topCourses)
        } catch (error : any) {
            res.status(HTTP_statusCode.InternalServerError).json({ message: error.message });
        }
    }

}

export default AdminController;