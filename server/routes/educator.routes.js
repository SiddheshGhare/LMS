import express from "express"
import { updateRoleToEducator } from "../controllers/educator.controller.js"


const educatorRouter = express.Router()


educatorRouter.get('/update-role',updateRoleToEducator)

export default educatorRouter;