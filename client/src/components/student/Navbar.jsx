import React, { useContext } from 'react'
import { assets } from "../../assets/assets"
import { Link, useLocation } from "react-router-dom"

import { AppContext } from '../../context/AppContext'
import { UserContext } from '../../context/authContext'

const Navbar = () => {
  const { navigate, } = useContext(AppContext)
  const { user,isEducator, logout, isAuthenticated,updateRole } = useContext(UserContext)
  
  
  // Fix: Import and use useLocation hook
  const location = useLocation()
  const isCourseListPage = location.pathname.includes("/course-list")

  const handleClick =async ()=>{

    if (isEducator) {
      navigate("/educator")
    }else{

      updateRole()
      navigate("/educator")


    }
  }

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? "bg-white " : "bg-cyan-100/70"} `}>
      <img onClick={() => navigate("/")} src={assets.logo} alt='Logo' className='w-28 lg:w-32 cursor-pointer' />
      
      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center gap-5 text-gray-500 '>
        {user&&
        <div className='flex items-center gap-5'>
          <button className='cursor-pointer' onClick={() =>handleClick() }>
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>
          | <Link to="/my-enrollments">My Enrollments</Link>
        </div>
}
        
        {/* Fixed: Show correct auth buttons */}
        {isAuthenticated ? (
          <button onClick={logout} className="cursor-pointer">Logout</button>
        ) : (
          <Link to='/signup'>Sign Up</Link>
        )}
      </div>

      
      
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        {user&&
          <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          <button onClick={() => navigate("/educator")}>
            {isEducator ? "Educator Dashboard" : "Become Educator"}
          </button>
          | <Link to="/my-enrollments">My Enrollments</Link>
        </div>
      }
        
        {/* Fixed: Add auth buttons for mobile too */}
        {isAuthenticated ? (
          <button onClick={logout} className="cursor-pointer max-sm:text-xs">Logout</button>
        ) : (
          <Link to='/signup' className="max-sm:text-xs">Sign Up</Link>
        )}
      </div>
    </div>
  )
}

export default Navbar