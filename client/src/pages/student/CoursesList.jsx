import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom'
import SearchBar from '../../components/student/SearchBar'
import CourceCard from '../../components/student/CourceCard'
import Footer from '../../components/student/Footer'

const CoursesList = () => {

  const {navigate,allCourses}=useContext(AppContext)
  const {input}=useParams()
  

  const [filteredCourse,setFilteredCourse]=useState([])
  
  useEffect(()=>{
    if (allCourses && allCourses.length>0) {
      const tempCourses=allCourses.slice()
      input ?
      setFilteredCourse(
        tempCourses.filter((item)=> item.courseTitle.toLowerCase().includes(input.toLowerCase()))
      )
      :setFilteredCourse(allCourses)      
    }
  },[allCourses,input])
  

  return (
    <>
      <div className='relative md:px-36 px-8 pt-20 text-left'>
        <div className='flex  justify-between md:flex-row flex-col gap-6 items-start w-full'>
          <div className=''>
            <h1 className='font-semibold text-4xl '>Course List</h1>
            <p className='text-sm '><span className='text-blue-600 cursor-pointer' onClick={()=>navigate("/")}>Home </span> /courseList</p>
          </div>
          <SearchBar data={input} />
        </div>
        {
          input &&
          <div className='inline-flex items-center gap-4 px-4 py-2 border mt-10 mb-5 text-gray-800'>
            <p>{input}</p>
            <img onClick={()=>navigate('/course-list')} src={assets.cross_icon} className='cursor-pointer'/>
          </div>
        }
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 gap-3 px-2 md:p-0'>
          {filteredCourse.map((course,i)=> <CourceCard key={i} course={course}/>)}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default CoursesList
