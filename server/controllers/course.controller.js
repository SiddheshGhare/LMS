

import Course from "../models/course.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getAllCourses = async(req,res)=>{

    const courses = await Course.find({
        isPublished:true
    }).select(["-courseContent","-enrolledStudents"]).populate({path:"educator"})

    if (!courses) {
        throw new ApiError(500,"courses not fetched")
    }
    return res.status(200).json(
        new ApiResponse(
            200,
            {courses},
            "courses fetched successfully"
        )
    )

}

const getCourseById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Course ID is required");
    }

    const course = await Course.findById(id)
        .select(["-enrolledStudents"])
        .populate({ path: "educator" });

    if (!course) {
        throw new ApiError(404, "Course not found");
    }

    // Check if course is published (optional - remove if you want to show unpublished courses to certain users)
    if (!course.isPublished) {
        throw new ApiError(403, "Course is not available");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            { course },
            "Course fetched successfully"
        )
    );
};

export{getAllCourses,getCourseById}