import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t'>
      <div className='flex items-center gap-4'>
        <img className='hidden md:block w-20 ' src={assets.logo} alt="" />
        <div className='hidden md:block h-7 w-px bg-gray-500/60'>
          <p className='py-4 text-center text-xs md:text-sm text-gray-600'>
            Copyright 2025 @ SidGhare,All Right Reserved
          </p>
        </div>
        <div  className='flex items-center gap-3 max-md:mt-4'>
          <a href="#"><img src={assets.facebook_icon} alt="" /></a>
          <a href="#"><img src={assets.instagram_icon} alt="" /></a>
          <a href="#"><img src={assets.twitter_icon} alt="" /></a>
        </div>
      </div>

    </footer>
  )
}

export default Footer
