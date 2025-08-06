import React from 'react'
import { assets } from '../../assets/assets'

function Footer() {
  return (
    <footer className='flex md:flex-row flex-col-reverse items-center justify-between w-full px-8 border-t py-4'>
      
      {/* Left Section (Logo + Divider + Copyright) */}
      <div className='flex items-center gap-4'>
        {/* Logo */}
        <img className='hidden md:block w-20' src={assets.logo} alt="Logo" />

        {/* Divider */}
        <div className='hidden md:block h-7 w-px bg-gray-500/60'></div>

        {/* Copyright */}
        <p className='text-xs md:text-sm text-gray-600'>
          Copyright 2025 @ SidGhare, All Rights Reserved
        </p>
      </div>

      {/* Right Section (Social Icons) */}
      <div className='flex items-center gap-3 mt-4 md:mt-0'>
        <a href="#"><img src={assets.facebook_icon} alt="Facebook" /></a>
        <a href="#"><img src={assets.instagram_icon} alt="Instagram" /></a>
        <a href="#"><img src={assets.twitter_icon} alt="Twitter" /></a>
      </div>

    </footer>
  )
}

export default Footer
