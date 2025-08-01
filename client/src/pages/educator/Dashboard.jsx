import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { assets, dummyDashboardData } from '../../assets/assets'
import Loading from '../../components/student/Loading'

const Dashboard = () => {
  const [dashboardData, setDashboardData]=useState(null)
  const{currency}=useContext(AppContext)

  const fetchDashboardData=()=>{
    setDashboardData(dummyDashboardData)

  }

  useEffect(()=>{
    fetchDashboardData()
  },[dummyDashboardData])

  return dashboardData? (
    <div className='min-h-screen flex flex-col items-start justify-between gap-8 md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <div className='space-y-5 '>
        <div className='flex flex-wrap gap-5 items-center'>
            <div className='flex items-center border border-blue-500 w-56 p-4 rounded-md gap-3 shadow-2xl'>
            <img src={assets.patients_icon} alt="" />
            <div className="whitespace-nowrap">
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.enrolledStudentsData.length}</p>
              <p className='  overflow-x-auto text-base text-gray-500 '>Total Enrollments</p>
            </div>
          </div>

           <div className='flex items-center border border-blue-500 w-56 p-4 rounded-md gap-3 shadow-2xl'>
            <img src={assets.lesson_icon} alt="" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{dashboardData.totalCourses}</p>
              <p className='text-base text-gray-500'>Total Courses</p>
            </div>
          </div>

           <div className='flex items-center border border-blue-500 w-56 p-4 rounded-md gap-3 shadow-2xl'>
            <img src={assets.earning_icon} alt="" />
            <div>
              <p className='text-2xl font-medium text-gray-600'>{currency}{dashboardData.totalEarnings}</p>
              <p className='text-base text-gray-500'>Total Earnings</p>
            </div>
          </div>

          

        </div>
        <div className=''>
          <h2>Latest Enrollments</h2>
        </div>
      </div>
      
    </div>
  ):<Loading/>
}

export default Dashboard
