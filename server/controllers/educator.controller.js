import {clerkClient} from"@clerk/express"


  export const updateRoleToEducator=async(req,res)=>{
    try {
        const {userId} = req.auth()
        console.log(req.auth());
        
        await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: "educator",
      },
    });
        res.json({success:true,message:"you can publish a course now"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

  }