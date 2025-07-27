import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import { useNavigate, useParams } from 'react-router-dom'

const SearchBar = ({data}) => {
  
  
  
  
  

   const navigate=useNavigate()
   const [input,setInput]=useState(data?data:"")
    const onSearchhandler =(e)=>{
        e.preventDefault()
        navigate("/course-list/"+input)
       
    }
    
    
  return (
    <div>
      <form onSubmit={onSearchhandler} className=' flex h-10 '>
        <div className='max-w-xl w-full md:h-10 h-8 bg-white flex items-center border border-gray-600'>
          <img src={assets.search_icon} alt="search icon" className='md:w-auto w-10 px-3' />
        <input
        onChange={(e)=>setInput(e.target.value)} 
        value={input}
        type='text'
        placeholder='search for courses'
        className='w-full h-full outline-none text-gray-500/80'
        />
        </div>
        <button type='submit' className='bg-blue-600 rounded  text-white md:px-8 px-7  md:py-2 py-2 mx-1'>Search</button>
      </form>
    </div>
  )
}

export default SearchBar
