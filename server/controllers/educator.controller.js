import { clerkClient } from "@clerk/express"
import Course from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary"
import { ApiError } from "../utils/ApiError.js";





// Add Course Api

export const addCourse = async (req, res) => {
  try {
    console.log("h3");

    const { courseData } = req.body;
    const imageFile = req.file;
    const { educatorId } = req.auth();
    console.log("h4");


    if (!imageFile) {
      return res.json({ success: false, message: "thumbnail not attatched" })
    }
    if (!courseData) {
      return res.json({ success: false, message: "courseData not attatched" })
    }
    // if (!educatorId) {
    //   return res.json({ success: false, message: "educatorId not attatched" })
    // }
    const parsedCourseData = await JSON.parse(courseData);

    parsedCourseData.educator = 1

    const newCourse = await Course.create(parsedCourseData)

    const cloudinaryImage = await cloudinary.uploader.upload(imageFile?.path)

    newCourse.courseThumbnail = cloudinaryImage.secure_url;
    await newCourse.save();

    res.json({ succes: true, message: "Course Added" })

  } catch (error) {
    res.json({ succes: false, message: "error at catch in controller" + error.message })
  }
}
