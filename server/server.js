import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./configs/mongodb.js"
import { clerkWebhooks, stripeWebhooks } from "./controllers/webHooks.js"

import connectToCloudinary from "./configs/cloudinary.config.js"
//import { ClerkExpressWithAuth } from '@clerk/express';

import cookieParser from "cookie-parser";







const app = express()
await connectDb();
connectToCloudinary();





app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true, // 👈 allow cookies to be sent
}));

app.use(cookieParser());
app.use(express.json())


import educatorRouter from "./routes/educator.routes.js"
import userRouter from "./routes/user.routes.js"
import courseRouter from "./routes/course.routes.js"

app.post("/clerk",clerkWebhooks)
app.use('/api/educator',educatorRouter)
app.use("/api/user",userRouter)
app.use("/api/course",courseRouter)
app.post("/stripe",express.raw({type:"application/json"}),stripeWebhooks)

const PORT= process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})


