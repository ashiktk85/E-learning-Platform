import {Router} from 'express'
import { AdminController } from '../controllers/adminController'
import { AdminService } from '../services/adminServices'

const route = Router()

const adminService = new AdminService()
const adminController = new AdminController(adminService)

route.post('/adminlogin', adminController.adminLogin.bind(adminController))
route.get('/getusers' , adminController.getUsers.bind(adminController))
route.patch('/blockuser/:email' , adminController.blockUser.bind(adminController))
route.patch('/unblockuser/:email', adminController.unblockUser.bind(adminController));

export default route;