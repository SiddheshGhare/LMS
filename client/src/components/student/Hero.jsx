import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'
import {useUser} from "@clerk/clerk-react"


const Hero = () => {
 const { user, isLoaded, isSignedIn } = useUser();

  if (isLoaded && isSignedIn) {
    console.log("userId is:", user.id);
  }



  
  const handleSubmit = async () => {
    try {
      console.log("hii");
      
      const res = await fetch(`http://localhost:7000/add`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // 👈 send full Clerk user object
    });

      
      const data = await res.json(); // parse JSON response

      console.log("Response:", data);
    } catch (err) {
      console.error("Error fetching:", err);
    }
  };



  return (
    <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 text-center bg-gradient-to-b from-cyan-100/70'>
      <h1 className='md:text-[48px]  text-[28px] relative font-bold text-gray-800 max-w-3xl mx-auto'>Empower your future with the courses to <span className='text-red-500 font-bold '>fit your choice</span><img src={assets.sketch} alt="sketch" className=' md:block hidden absolute -bottom-7 right-0' /> </h1>

      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto'>we bring together world class instructors ,interactive content and a supportive community to help  you achive your personal and professional goals</p>

      <p className='md:hidden  text-gray-500 max-w-sm mx-auto'>we bring together world class instructors ,interactive content and a supportive community to help  you achive your personal and professional goals</p>
      <button onClick={()=> handleSubmit()}>send req</button>

       {/* <button onClick={handleSubmit()}>send</button> */}
     

    
        <SearchBar />
    </div>

  )
}

export default Hero
