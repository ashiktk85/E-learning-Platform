import { Request, Response } from "express";
import { AdminService } from "../services/adminServices";
import { emitKeypressEvents } from "readline";

export class AdminController {
    private adminService : AdminService;

    constructor (adminService : AdminService) {
        this.adminService = adminService
    }

    async adminLogin(req : Request , res : Response) : Promise<| void> {
        try {
            const {email , password} = req.body;
            console.log(email, password);
            const data = await this.adminService.adminLoginService(email , password);
            
            res.status(200).json({ message: "admin  Login successful", data });   
        } catch ( error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getUsers(req : Request , res : Response) : Promise<any | void> {
        try {
            const userList = await this.adminService.getUserListService()
            console.log("user list contriller", userList);
            res.status(200).json(userList)
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async blockUser(req : Request , res : Response) : Promise<any | void> {
        try {
           const { email } = req.params
            const response = await this.adminService.blockUserService(email)
            console.log(response);

            res.status(200).json(response)
            
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    } 

    async unblockUser(req : Request , res : Response) : Promise<any | void> {
        try {
           const { email } = req.params
            const response = await this.adminService.unblockeUserService(email)
            console.log(response);

            res.status(200).json(response)
            
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    } 

    async getApplicationsController(req : Request , res : Response) : Promise<any | void> {
        try {

            const getApplications = await this.adminService.getApplicationService()

            // console.log("user list contriller", getApplications);
            res.status(200).json(getApplications)
            
        } catch (error : any ) {
            res.status(500).json({ message: error.message });
        }
    }

    async getOneApplication(req : Request , res : Response) : Promise<any | void> {
        try {
            const {id} =  req.params;
            const applicant = await this.adminService.getOneApplicationService(id)
            res.status(200).json(applicant)
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async acceptApplication(req : Request , res : Response) {
        try {
            const { id } = req.params
            console.log("id " , id);
            const response  = await this.adminService.acceptApplicaiton(id)       
            if(response) {
                res.status(200).json(response)
            }   
        } catch (error) {
            
        }
    }

    async checkTutorStatus(req : Request , res : Response) : Promise<boolean | void> {
        try {
            const { email } = req.params
            console.log("id " , email);
            const response  = await this.adminService.checkStatus(email)
            if(response) {
                res.status(200).json(response)
            }      
        } catch (error :any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createCategory(req : Request , res :Response) : Promise<any> {
        try {
            const {categoryName , description} = req.body
            const response = await this.adminService.createCategoryService(categoryName as string , description as string)
            if(response) {
                res.status(200).json(response)
            }
        } catch ( error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCategories(req : Request , res : Response) : Promise<any> {
        try {
            const response = await this.adminService.getCategoriesService()
             if(response) {
                res.status(200).json(response)
            }
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async userReport(req : Request , res :Response) {
        try {
          const  {courseId ,videoId ,reason ,additionalInfo} = req.body;
          console.log("e",courseId ,"e",videoId , "e", reason , "add" ,additionalInfo);
          
            const reporting = await this.adminService.reportCourseService(courseId , videoId , reason , additionalInfo)

            if(reporting === true) {
              return  res.status(201).json(true)
            } 

            res.json(false)

        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getReports(req : Request , res :Response) {
        try {
            const reports = await this.adminService.getReportService()

            res.status(200).json(reports)
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }

    async reportDetail(req : Request , res :Response) {
        try {
            const {reportId} = req.params
            // console.log(reportId);
            
            const report = await this.adminService.reportDetail(reportId)

            res.status(200).json(report)

            
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }


    async getCourses(req : Request , res :Response) {
        try {
            const courses = await this.adminService.getCourses()

            res.status(200).json(courses)
        } catch (error : any) {
            res.status(500).json({ message: error.message });
        }
    }



}