import {Router} from 'express'
import { AdminController } from '../controllers/adminController'
import { AdminService } from '../services/adminServices'

const route = Router()

const adminService = new AdminService()
const adminController = new AdminController(adminService)

route.post('/adminlogin', adminController.adminLogin.bind(adminController))
route.get('/getusers' , adminController.getUsers.bind(adminController))
route.get('/getTutors' , adminController.getTutors.bind(adminController)) 
route.patch('/blockuser/:email' , adminController.blockUser.bind(adminController))
route.patch('/unblockuser/:email', adminController.unblockUser.bind(adminController));
route.get('/getapplications', adminController.getApplicationsController.bind(adminController))
route.get('/applicationview/:id' , adminController.getOneApplication.bind(adminController))
route.post('/acceptapplication/:id', adminController.acceptApplication.bind(adminController) )
route.get('/checktutorstatus/:email', adminController.checkTutorStatus.bind(adminController))
route.post('/createcategory', adminController.createCategory.bind(adminController))
route.get('/categories' , adminController.getCategories.bind(adminController))
route.post('/report' , adminController.userReport.bind(adminController))
route.get('/getReports' , adminController.getReports.bind(adminController))
route.get('/getcourses', adminController.getCourses.bind(adminController))

route.patch('/blockcourse/:courseId', adminController.blockCourse.bind(adminController));
route.patch('/unblockcourse/:courseId', adminController.unBlockCourse.bind(adminController));

//
route.get('/reportDetail/:reportId',adminController.reportDetail.bind(adminController))


export default route;