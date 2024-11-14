import {Router} from 'express'
import  AdminController  from '../controllers/adminController'
import  AdminService  from '../services/adminServices'
import AdminRepository from '../repository/adminRepository'
import { verifyAdminToken } from '../config/jwtConfig'
import userModel from '../models/userModel'
import categoryModel from '../models/categoryModel'
import { Course } from '../models/courseModel'
import TutorApplication from '../models/applicationModel'
import UserRepositary from '../repository/userRepository'
import Report from '../models/reportModel'

const route = Router()

const adminRepository = new AdminRepository(userModel,Course,categoryModel,TutorApplication ,Report)
const userRepository = new UserRepositary(userModel , Course)
const adminService = new AdminService(adminRepository,userRepository )

const adminController = new AdminController(adminService)

route.post('/adminlogin', adminController.login.bind(adminController))
route.get('/getusers' , adminController.getUsers.bind(adminController))
route.get('/getTutors' , adminController.getTutors.bind(adminController)) 
route.patch('/blockuser/:email', adminController.blockUser.bind(adminController))
route.patch('/unblockuser/:email', adminController.unblockUser.bind(adminController));
route.get('/getapplications', adminController.getApplications.bind(adminController))
route.get('/applicationview/:id' , adminController.findApplication.bind(adminController))
route.post('/acceptapplication/:id', adminController.acceptApplication.bind(adminController))
route.get('/check-tutorstatus/:email', adminController.checkTutorStatus.bind(adminController))
route.post('/createcategory', adminController.createCategory.bind(adminController))
route.get('/categories' ,adminController.getCategories.bind(adminController))
route.post('/report' , adminController.reportCourse.bind(adminController))
route.get('/getReports' , adminController.getReports.bind(adminController))
route.get('/getcourses', adminController.getCourses.bind(adminController))

route.patch('/blockcourse/:courseId', adminController.blockCourse.bind(adminController));
route.patch('/unblockcourse/:courseId', adminController.unBlockCourse.bind(adminController));

route.get('/reportDetail/:reportId',adminController.reportDetail.bind(adminController))
route.get('/dashboard' , adminController.getDashboard.bind(adminController))
route.get('/top5-tutors', adminController.getTopTutors.bind(adminController))
route.get('/top5-courses',adminController.getTopCourses.bind(adminController))


export default route;