import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import humanizeDuration from "humanize-duration"
import YouTube from "react-youtube"
import Footer from '../../components/student/Footer'
import Rating from '../../components/student/Rating'
const Player = () => {

    const { enrolledCourses, calculateChapterTime } = useContext(AppContext)
    const [openSection, setOpenSection] = useState({})
    const { courseId } = useParams()
    const [playerData, setPlayerData] = useState(null)
    const [courseData, setCourseData] = useState(null)
    console.log(courseData);


    const getCourseData = () => {
        enrolledCourses.map((course) => {
            if (course._id === courseId) {
                setCourseData(course)

            }
        })
    }

    const toggleSection = (index) => {
        setOpenSection((prev) => (
            {
                ...prev,
                [index]: !prev[index]
            }
        ))
    }
    useEffect(() => {
        getCourseData()
    }, [enrolledCourses])


    return (
        <>
            <div className='p-4 sm:p-10 flex flex-col-reverse md:grid md:grid-cols-2  gap-10 md:px-36'>
                {/* left column */}
                <div>
                    <h2>Course Structure</h2>
                    <div className=' pt-5'>

                        {courseData && courseData.courseContent.map((chapter, i) => (
                            <div key={i} className='border border-gray-300 bg-white mb-2 rounded'>
                                <div className='flex items-center justify-between px-4 py-3 cursor-pointer select-none' onClick={() => toggleSection(i)}>
                                    <div className='flex items-center gap-2'>
                                        <img className={`transform transition-transform ${openSection[i] ? "rotate-180" : ""}`} src={assets.down_arrow_icon} alt="" />
                                        <p className='font-medium md:text-base text-sm'>{chapter.chapterTitle}</p>
                                    </div>
                                    <p className='text-sm md:text-default'>{chapter.chapterContent.length} lectures - {calculateChapterTime(chapter)}</p>
                                </div>
                                <div className={`overflow-hidden transition-all duration-300 ${openSection[i] ? "max-h-96" : "max-h-0"}`}>
                                    <ul className='list-disc md:pl-10 pl-4 py-2 text-gray-600 border-t border-gray-300'>
                                        {chapter.chapterContent.map((lecture, index) => (
                                            <li key={index} className='flex items-start gap-2 py-1'>
                                                <img src={false ? assets.blue_tick_icon : assets.play_icon} className='w-4 h-4 mt-1' alt="" />
                                                <div className='flex items-center justify-between w-full text-gray-800 text-xs md:text-default'>
                                                    <p>{lecture.lectureTitle}</p>
                                                    <div className='flex gap-2'>
                                                        {lecture.lectureUrl && <p onClick={() => setPlayerData({
                                                            ...lecture, chapter: i + 1, lecture: index + 1
                                                        })} className='text-blue-500 cursor-pointer'>Watch</p>}
                                                        <p>{humanizeDuration(lecture.lectureDuration * 60 * 1000, { units: ["h", "m"] })}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}

                    </div >
                        <div className='flex items-center gap-2 py-3 mt-10'>
                            <h1 className=' text-xl font-bold'>Rate Course</h1>
                            <Rating initialRating={0}/>
                        </div>

                </div>

                {/* right column */}

                <div>
                    {
                        playerData ?
                            <div className='md:mt-10'>
                                <YouTube videoId={playerData.lectureUrl.split('/').pop()} iframeClassName='w-full aspect-video' />
                                <div className='flex justify-between items-center mt-1'>
                                    <p>{playerData.chapter}.{playerData.lecture}{playerData.lectureTitle}</p>
                                    <button className='text-blue-600'>{false ? 'completed':'mark Complete'}</button>
                                </div>
                            </div>

                            : (
                                courseData && courseData.courseThumbnail ? (
                                    <img src={courseData.courseThumbnail} alt="thumbnail" />
                                ) : (
                                    <p>Loading thumbnail...</p>
                                )
                            )
                    }
                </div>
            </div>
            <Footer/>

        </>
    )
}

export default Player
