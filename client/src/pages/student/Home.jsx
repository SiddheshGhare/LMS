import React from 'react'
import Hero from '../../components/student/Hero'
import Companies from '../../components/student/Companies'
import CourcesSection from '../../components/student/CourcesSection'
import TestimonialSection from '../../components/student/TestimonialSection'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero/>
      <Companies/>
      <CourcesSection/>
      <TestimonialSection/>
    </div>
  )
}

export default Home
