import React from 'react'
import { assets } from '../../assets/assets'

const Companies = () => {
  return (
    <div className='pt-10 '>

        <p className='text-base text-gray-500'>Trusted by lerners from</p>
        <div className='flex  md:gap-16 gap-6 md:mt-10 mt-5 items-center justify-center '>
            <img src={assets.microsoft_logo} alt="microsoft" className='w-20 md:w28' />
            <img src={assets.walmart_logo} alt="microsoft" className='w-20 md:w28' />
            <img src={assets.accenture_logo} alt="microsoft" className='w-20 md:w28' />
            <img src={assets.adobe_logo} alt="microsoft" className='w-20 md:w28' />
            <img src={assets.paypal_logo} alt="microsoft" className='w-20 md:w28' />
        </div>
      
    </div>
  )
}

export default Companies
