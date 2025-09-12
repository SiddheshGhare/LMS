import express from "express"
import { addCourse,getAllCourses ,educatorDashboardData} from "../controllers/educator.controller.js"
import upload from "../configs/multer.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"



const educatorRouter = express.Router()



educatorRouter.post("/add-course",upload.single('image'),verifyJWT,addCourse)
educatorRouter.get("/getCourses",verifyJWT,getAllCourses)
educatorRouter.get("/educatorDashboardData",verifyJWT,educatorDashboardData)

export default educatorRouter;