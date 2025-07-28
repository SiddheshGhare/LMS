import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import Loading from "../../components/student/Loading"
import { assets } from '../../assets/assets'

const CourseDetails = () => {

  const { id } = useParams()
  const [courseData, setCourseData] = useState(null)
  const { allCourses, calculateRating } = useContext(AppContext)
  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id)
    setCourseData(findCourse)
  }
  useEffect(() => {
    fetchCourseData()
  }, [])







  return (courseData ?
    <>
      <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 md:pt-32
    pt-20 text-left'>

        <div className='absolute top-0 left-0 w-full h-[500px] -z-10 bg-gradient-to-b from-cyan-100/70 to-white'></div>
        {/* left Column */}
        <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-3xl text-xl font-semibold text-gray-800'>{courseData.courseTitle}</h1>
          <p className='pt-4 md:text-base text-sm'
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
          ></p>
          {/* rating */}
          <div className='flex items-center space-x-2 pt-3 pb-2'>
            <p>{calculateRating(courseData)}</p>
            <div className='flex'>
              {Array.from({ length: 5 }, (_, i) => (
                <img key={i} src={i < Math.floor(calculateRating(courseData)) ? assets.star : assets.star_blank} className="w-3.5 h-3.5" />
              ))}
            </div>
            <p className='text-gray-500 '>({courseData.courseRatings.length}{courseData.courseRatings.length > 1 ? "Ratings" : "Rating"})</p>
            <p>{courseData.enrolledStudents.length}{courseData.enrolledStudents.length > 1 ? "students" : "student"}</p>
          </div>

              <p className='text-sm'>Course By <span className='text-blue-600 underline'>Sid</span></p>

        </div>
        {/* right Column */}
        <div>

        </div>


      </div>
    </> : <Loading />
  )
}

export default CourseDetails
