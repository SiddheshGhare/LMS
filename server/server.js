import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webHooks.js"
import educatorRouter from "./routes/educator.routes.js"
import { clerkMiddleware } from "@clerk/express"
import connectToCloudinary from "./configs/cloudinary.config.js"



const app = express()
await connectDb();
connectToCloudinary();


app.use(cors())
app.use(express.json())
 app.use( clerkMiddleware({
    audience: ["http://localhost:5173", "http://localhost:7000"], // allow frontend + backend
  }))


app.post("/clerk",clerkWebhooks)
app.use('/api/educator',educatorRouter)

const PORT= process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})