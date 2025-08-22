import mongoose from "mongoose"; 


const connectDb = async () => { 
   try {
     mongoose.connection.on('connected', () => console.log("database connected "))
 
     await mongoose.connect(process.env.MONGO_URL)
   } catch (error) {
    console.log(error);
    
   }
 }
     export default connectDb