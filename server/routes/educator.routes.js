import express from "express"
import { addCourse, updateRoleToEducator } from "../controllers/educator.controller.js"
import upload from "../configs/multer.js"



const educatorRouter = express.Router()


educatorRouter.patch('/update-role',updateRoleToEducator)
educatorRouter.post("/add-course",upload.single('image'),addCourse)

export default educatorRouter;