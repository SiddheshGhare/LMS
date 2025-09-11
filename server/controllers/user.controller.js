import {User} from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken();
        console.log(refreshToken);
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }




    } catch (error) {
        throw new ApiError(500, "something went wrong")

    }
}






const registerUser = asyncHandler(async(req,res)=>{

    const { fullname, email, password } = req.body;
     if (
        [fullname, email,password].some((field) =>

            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
     const existedUser = await User.findOne({email})
    if (existedUser) {
        throw new ApiError(409, "username or email already exists")

    }
     const user = await User.create({
        fullname,
        email,
        password,
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "something went wrong")

    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "user registered successfully")
    )
})


const loginUser = asyncHandler(async (req, res) => {
    // request body data fetch 
    //username or email
    //find the user  in database 
    //check password 
    //access and refresh token
    //send cookie


    const { email, password } = req.body

    if (!( email)) {
        throw new ApiError(400, "email or password required")

    }

    const user = await User.findOne({email})

    if (!user) {
        throw new ApiError(400, "credentials not found")

    }

    const isPasswordValid = await user.isPasswordCorrect(password)


    if (!isPasswordValid) {
        throw new ApiError(400, "invalid password")
    }


    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedUser = await User.findById(user._id).select("-password -refreshToken")


   // In logoutUser controller, update the options to match login:
const options = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Match your login settings
  sameSite: "lax", // Match your login settings
}


    return res.status(200)
        .cookie("accessToken", accessToken, options)
        // .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedUser, accessToken
                },
                "user logged in successfully"
            )
        )





})


const logoutUser = asyncHandler(async (req, res) => {

   const logoutUser= await User.findByIdAndUpdate(req.user._id,
        {
            $set: {
                refreshToken: undefined
            },
        },
        {
            new: true//to get new updated model
        })
        console.log(logoutUser);
        

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(200, {}, "logged out successfully")
        )



})


export {registerUser,loginUser,logoutUser}