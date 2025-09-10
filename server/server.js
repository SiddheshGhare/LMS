import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webHooks.js"

import { requireAuth ,getAuth } from "@clerk/express"
import connectToCloudinary from "./configs/cloudinary.config.js"
//import { ClerkExpressWithAuth } from '@clerk/express';







const app = express()
await connectDb();
connectToCloudinary();


app.use(cors())
app.use(express.json())


import educatorRouter from "./routes/educator.routes.js"
import userRouter from "./routes/user.routes.js"

app.post("/clerk",clerkWebhooks)
app.use('/api/educator',educatorRouter)
app.use("/api/user",userRouter)

const PORT= process.env.PORT || 7000
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})


