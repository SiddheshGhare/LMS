import React from 'react'
import { assets, dummyTestimonial } from '../../assets/assets'

const TestimonialSection = () => {
  return (
    <div className='pb-14 px-8 md:px-0'>
      <h2 className='text-3xl font-medium text-gray-800'>Testimonials</h2>
      <p className='md:text-base text-gray-500 mt-3 mb-5'>Hear from our learners as they share their journeys of transformation,success ,and how our platform has made a  difference in their lives.</p>
      <div className='grid  grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-5'>
        {dummyTestimonial.map((testimonial,i)=>(
            <div key={i} className='text-sm text-left border border-gray-500/30 pb-6 rounded-lg bg-white  shadow-[opx_4px_15px_0px] shadow-black/5 overflow-hidden'>
                <div className='flex items-center gap-4  px-4 bg-gray-500/10'>
                    <img className='h-12 w-12  mt-1 rounded-full' src={testimonial.image} alt="" />
                    <div>
                        <h1 className='text-lg font-medium text-gray-800'>{testimonial.name}</h1>
                        <p className='text-gray-800/80'>{testimonial.role}</p>
                    </div>
                    
                </div>
                <div className=' p-5  pb-7'>
                        <div className='flex gap-0.5'>
                            {Array.from({ length: 5 }, (_, i) => (
                                                        <img key={i} src={i< Math.floor(testimonial.rating)? assets.star : assets.star_blank} className=" h-5" />
                                                    ))}
                        </div>
                        <p className='text-gray-500 mt-5'>{testimonial.feedback}</p>
                    </div>
                    <a className='px-5' href="#">Read More</a>

            </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialSection
