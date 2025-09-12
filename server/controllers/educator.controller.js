
import Course from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Purchase } from "../models/Purchase.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

// Add Course Api
const addCourse = asyncHandler(async (req, res) => {
  console.log("h3");
  
  const { courseData } = req.body;
  const imageFile = req.file;
  const educatorId = req.user._id;
  
  if (!imageFile) {
    throw new ApiError(400, "Thumbnail not attached");
  }
  if (!courseData) {
    throw new ApiError(400, "Course data not attached");
  }
  if (!educatorId) {
    throw new ApiError(401, "Educator ID not attached");
  }
  
  const parsedCourseData = JSON.parse(courseData);
  parsedCourseData.educator = educatorId;
  
  const cloudinaryImage = await cloudinary.uploader.upload(imageFile?.path);
  parsedCourseData.courseThumbnail = cloudinaryImage.secure_url;
  
  const newCourse = await Course.create(parsedCourseData);
  
  return res.status(201).json(
    new ApiResponse(201, { course: newCourse }, "Course added successfully")
  );
});

const getAllCourses = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const courses = await Course.find({ educator: _id });
  
  if (!courses) {
    throw new ApiError(500, "Unable to get courses");
  }
  
  return res.status(200).json(
    new ApiResponse(200, { courses }, "Fetched courses successfully")
  );
});

const educatorDashboardData = asyncHandler(async(req,res)=>{

  const educator =req.user._id

  const courses = await Course.find({ educator:new mongoose.Types.ObjectId(educator)});
  if (!courses) {
    throw new ApiError(500,"Courses not found")
  }
  console.log(courses);
  
  const totalCourses=courses.length

  const courseIds=courses.map((course)=>course._id)

  const purchases = await Purchase.find({

    courseId:{$in:courseIds},
    status:"completed"
  })

  const totalEarnings = purchases.reduce((sum,purchase)=>sum+purchase.amount,0)

//  const enrolledStudentsData = await Course.aggregate([
//   {
//     $match: { educator:new mongoose.Types.ObjectId(educator) }
//   },
//   {
//     $unwind: "$enrolledStudents"
//   },
//   {
//     $addFields: {
//       // Convert string to ObjectId for lookup
//       studentObjectId: { $toObjectId: "$enrolledStudents" }
//     }
//   },
//   {
//     $lookup: {
//       from: "users",                    
//       localField: "studentObjectId",    // Use converted ObjectId
//       foreignField: "_id",              
//       as: "studentData"                 
//     }
//   },
//   {
//     $unwind: "$studentData"
//   },
//   {
//     $project: {
//       courseTitle: 1,                   
//       name: "$studentData.fullname",    
//       email: "$studentData.email"       
//     }
//   }
// ]);

// Now the aggregation is much simpler since ObjectIds are properly typed
const enrolledStudentsData = await Course.aggregate([
  {
    $match: { educator: new mongoose.Types.ObjectId("68c1af293b75c64a2e692d33") }
  },
  {
    $unwind: "$enrolledStudents"
  },
  {
    $lookup: {
      from: "users",                    // Check if it's "users", "Users", or "User"
      localField: "enrolledStudents",   // No conversion needed now!
      foreignField: "_id",              
      as: "studentData"                 
    }
  },
  {
    $unwind: "$studentData"
  },
  {
    $project: {
      courseTitle: 1,                   
      name: "$studentData.fullname",    // Make sure this field exists
      email: "$studentData.email"       
    }
  }
]);



if (!enrolledStudentsData) {
  throw new ApiError(501,"problem in aggregation")
}

// const enrolledStudentsData=[]

//   for (const course of courses){
//     const students = await User.find({
//       _id:{$in:course.enrolledStudents}
//     },"fullname email")
//     students.forEach(student=>{
//       enrolledStudentsData.push({
//         courseTitle:course.courseTitle,
//         student
//       })
//     })
//   }

  return res.status(200).json(
    new ApiResponse(200,{totalEarnings,totalCourses,enrolledStudentsData},"educatorData fetched successfully ")

  )
   

}
)

export {getAllCourses,addCourse,educatorDashboardData}






