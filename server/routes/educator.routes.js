import express from "express"
import { addCourse } from "../controllers/educator.controller.js"
import upload from "../configs/multer.js"



const educatorRouter = express.Router()



educatorRouter.post("/add-course",upload.single('image'),addCourse)

export default educatorRouter;