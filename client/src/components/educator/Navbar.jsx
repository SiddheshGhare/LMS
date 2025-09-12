import React, { useContext } from 'react'
import { assets, dummyEducatorData } from '../../assets/assets'

import { Link } from 'react-router-dom';
import { UserContext } from '../../context/authContext';
const Navbar = () => {
  const educatorData=dummyEducatorData;
  const {user,isAuthenticated,logout}=useContext(UserContext)
 
  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-500 py-3'>
      <Link to={"/"}>
      <img src={assets.logo} alt="logo" />
      </Link>
      <div className='flex items-center text-gray-500 relative gap-5'>
        <p>Hi!{user? user.fullname:'Developers'}</p>

        {isAuthenticated &&
        <Link to={"/"} onClick={logout}>Logout</Link>
         
        }
      </div>
    </div>
  )
}

export default Navbar
