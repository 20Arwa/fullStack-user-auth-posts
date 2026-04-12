import { Router } from "express";
import validateToken from "../middleware/validateToken.js";
import {registUser, loginUser, getUserInfo} from "../controller/user.controller.js"

const userRouter = Router()

userRouter.route('/register').post(registUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/me').get(validateToken,getUserInfo)

export default userRouter