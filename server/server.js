import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDb from "./configs/mongodb.js"
import { clerkWebhooks } from "./controllers/webHooks.js"


const app = express()
await connectDb();

app.use(cors())

app.get("/",(req,res)=>{
res.send("api working")
})

app.post("/clerk",express.json(),clerkWebhooks)

const PORT= process.env.PORT || 7000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
    
})