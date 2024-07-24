import { Router } from "express";

import { UserController } from "../controllers/userController";

const userController = new UserController()
const route = Router()


route.post('/signUp' , userController.createUser.bind(userController))

export default route;



