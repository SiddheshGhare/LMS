import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
        <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b
         border-white/30'>
            <div className='flex flex-col md:items-start items-center w-full'>
                <img src={assets.logo_dark} alt="" />
                <p className='mt-6 text-center md:text-left text-white text-sm'>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.Ea facilis voluptate cupiditate tempore esse nemo beatae expedita, dignissimos commodi soluta nesciunt,
                </p>
            </div>
            <div className='flex flex-col md:items-start items-center w-full  ml-25 '>
                <h2 className='font-semibold text-white mb-5'>
                    Company
                </h2>
                <ul className=' flex md:flex-col w-full justify-between text-sm text-white/80 md:space-y-2'>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Privacy policy</a></li>
                   
                </ul>
            </div>
            <div className='hidden md:flex flex-col items-start w-full'>
                <h2 className='font-semibold text-white mb-5'>subscribe to our newsletter</h2>
                <p className='text-sm text-white'>The latest news ,article, and new resourses , sent to your inbox weekly</p>
                <div className='flex items-center gap-2 pt-4'>
                    <input type="email"
                    placeholder='enter your email '
                    className='border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 text-sm'
                    />
                    <button className='bg-blue-600 w-24 h-9 text-white rounded'>subscribe</button>
                </div>
            </div>
        </div>
      <p className='py-4 text-center text-xs md:text-sm text-white'>
        Copyright 2025 Sid Ghare. All Right Reserved.
      </p>
    </footer>
  )
}

export default Footer
