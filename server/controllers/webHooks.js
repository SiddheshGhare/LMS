import { Webhook } from "svix";
import User from "../models/user.model.js";


export const clerkWebhooks = async (req,res)=>{
    try {
        const wHook = new Webhook(process.env.CLERK_SECRET)
        await wHook.verify(JSON.stringify(req.body),{
            "svix-id":req.headers["svix-id"],
            "svix-timestamp":req.headers["svix-timestamp"],
            "svix-signature":req.headers["svix-signature"]

        })

        const {data,type } = req.body

        switch (type) {
            case "user.created":{
                const userData ={
                    _id:data.id,
                    email:data.email_addresses[0].email_address,
                    name:data.first_name +" "+data.last_name,
                    imageUrl:data.image_url

                }
                await User.create(userData)
                res.json({message:"user Created "})
                break;
            }

            case "user.updated":{
                 const userData ={
                    email:data.email_addresses[0].email_address,
                    name:data.first_name +" "+data.last_name,
                    imageUrl:data.image_url

                }
                await User.findByIdAndUpdate(data.id,userData)
               res.json({ message: "User updated" });
                break;

            }

            case "user.deleted":{
                await User.findByIdAndDelete(data.id)
                res.json("deleted")
                break;
            }
                
               
        
            
        }

    } catch (error) {
        res.json({success:false,message:error.message})
        
    }

}