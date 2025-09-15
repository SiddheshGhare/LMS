import { getAllCourses ,getCourseById} from "../controllers/course.controller.js";
import express from "express"
import upload from "../configs/multer.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"



const router = express.Router()


router.route("/getAllCourses").get(getAllCourses)
router.route("/getCourse/:id").get(getCourseById);

export default router