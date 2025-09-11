import React, { useContext } from 'react'
import { assets } from "../../assets/assets"
import { Link } from "react-router-dom"

import { AppContext } from '../../context/AppContext'
import { UserContext } from '../../context/authContext'

const Navbar = () => {

  const { navigate, isEducator } = useContext(AppContext)
  const { user,logout } = useContext(UserContext)


  const isCourseListPage = location.pathname.includes("/course-list")








  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white " : "bg-cyan-100/70"} `}>
      <img onClick={() => navigate("/")} src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer' />
      <div className='hidden md:flex items-center gap-5 text-gray-500 '>
        <div className='flex items-center gap-5'>



          <>
            <button className=' cursor-pointer' onClick={() => navigate("/educator")}>{isEducator ? "Educator Dahsboard" : "Become Educator"}</button>
            |   <Link to="/my-enrollments">My Enrollments</Link>
          </>

        </div>
         <Link to='/signup'>Signin</Link>

      {user ?
        <button onClick={logout}>Logout</button>:
        <Link to='/signup'>Signin</Link>

      }


      </div>


      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>



          <>
            <button onClick={() => navigate("/educator")}>{isEducator ? "Educator Dahsboard" : "Become Educator"}</button>
            |   <Link to="/my-enrollments">My Enrollments</Link>
          </>

        </div>



      </div>
    </div>
  )
}

export default Navbar
