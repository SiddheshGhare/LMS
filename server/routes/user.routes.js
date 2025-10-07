


import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { loginUser, registerUser,logoutUser,updateRoleToEducator,getUserData,userEnrolledCourses ,purchaseCourse} from "../controllers/user.controller.js";

const router= Router()
router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT,logoutUser)
router.route("/update-role").patch(verifyJWT,updateRoleToEducator)
router.route("/getUserData").get(verifyJWT,getUserData)
router.route("/userEnrolledCourses").get(verifyJWT,userEnrolledCourses)
router.route("/purchaseCourse").post(verifyJWT,purchaseCourse)

export default router;