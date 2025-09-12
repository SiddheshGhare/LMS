import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        password: {
            type: String,
            required: true
        },
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ["educator", "student"],  // Clean array with no extra spaces
            default: "student"
        },
        imageUrl: {
            type: String,
            // required:true
        },
        refreshToken: {
            type: String
        },
        enrolledCourses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "course"
            }
        ],


    }, { timestamps: true })

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}



userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, // Correct secret for access tokens
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY // Example: '15m'
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET, // Correct secret for refresh tokens
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY // Example: '7d'
        }
    );
};

export const User = mongoose.model("User", userSchema)