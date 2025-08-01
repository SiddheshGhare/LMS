import React from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'
import {UserButton, useUser} from "@clerk/clerk-react"
import { Link } from 'react-router-dom';
const Navbar = () => {
  const educatorData=dummyEducatorData;
  const {user}=useUser()
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to={"/"}>
      <img src={assets.logo} alt="logo" />
      </Link>
      <div className='flex items-center text-gray-500 relative gap-5'>
        <p>Hi!{user? user.fullName:'Developers'}</p>
        {
          user? <UserButton/>:<img className='w-8 h-8' src={assets.profile_img}/>
        }
      </div>
    </div>
  )
}

export default Navbar
