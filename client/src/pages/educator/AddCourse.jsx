
import React, { useEffect, useRef } from 'react'
import uniqid from "uniqid"
import Quill from "quill"
import { useState } from 'react'
import { assets } from '../../assets/assets'


const AddCourse = () => {
  const quillRef = useRef(null)
  const editorRef = useRef(null)
  const [courseTitle , setCourseTitle]=useState('')
  const [coursePrice ,setCoursePrise]=useState(0)
  const [discount , setDiscount]=useState(0)
  const [image, setImage]=useState(null)
  const [chapters , setChapters]=useState([])
  const [showPopUp,setPopUp]=useState(false)
  const [currentChapterId,setCurrentChapterId]=useState(null)
  const [lectureDetails,setLecturedetails]=useState({
    lectureTitle:'',
    lectureDuration:'',
    lectureUrl:'',
    isPreviewFree:false
  })

  const handleChapter =(action,chapterId)=>{
    

  }

  useEffect(()=>{
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current,{theme:"snow",})
    }
  },[])
  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
      <form  className='flex  flex-col gap-4 max-w-md w-full text-gray-500 '>
        <div>
          <p>Course Title</p>
          <input
          onChange={(e)=>setCourseTitle(e.target.value)}
          value={courseTitle}
          type="text"
          placeholder='type here'
          required
          className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

       <div className='flex   items-center justify-between flex-wrap'>
         <div className='flex flex-col gap-1 '>
          <p>Course Price</p>
          <input
           onChange={(e)=>setCoursePrise(e.target.value)}
           value={coursePrice}
           type="number"
           placeholder='0'
           className=' outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500 '
           required
           />
        </div>

        <div className='flex md:flex-row flex-col items-center gap-3'>
          <p>Course Thumbnail</p>
          <label htmlFor="thumbnailImage" className=' flex items-center gap-3'>
            <img src={assets.file_upload_icon} alt="" className='p-3 bg-blue-500 rounded' />
            <input type="file"  id='thumbnailImage'
            onChange={(e)=>setImage(e.target.files[0])}
            accept='image/*'
            hidden
            />
            <img src={image ? URL.createObjectURL(image):""} alt="" />
          </label>

        </div>
       </div>

       
         <div className='flex flex-col gap-1 '>
          <p>Discount</p>
          <input
           onChange={(e)=>setDiscount(e.target.value)}
           value={discount}
           min={0}
           max={100}
           type="number"
           placeholder='0'
           className=' outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500 '
           required
           />
        </div>

        {/* Adding Chapters and lectures */}
        <div>
          {
            chapters.map((chapter,chapterIndex)=>{
              <div key={chapterIndex} className='bg-white border  rounded-lg mb-4'>
                <div className='flex justify-between items-center p-4 border-b'>
                  <div className='flex items-center'>
                    <img src={assets.down_arrow_icon} width={14} alt="" className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`} />
                    <span className='font-semibold'>{chapterIndex+1}{chapter.chapterTitle}</span>

                  </div>
                  <span className='text-gray-500'>{chapter.chapterContent.length} lectures</span>
                  <img src={assets.cross_icon} alt="" className='cursor-pointer' />
                </div>
                  {
                    !chapter.collapsed && (
                      <div className="p-4">
                        {
                          chapter.chapterContent.map((lecture,lectureIndex)=>{
                            <div key={lectureIndex} className=' flex justify-between items-center mb-2'>
                              <span>{lectureIndex +1}{lecture.lectureTitle}-{lecture.lectureDuration}mins - <a href={lecture.lectureUrl } target='_blank' className=' text-blue-500'>Link</a> - {lecture.isPreviewFree?
                               "Free Preview " :'paid'}</span>
                               <img src={assets.cross_icon} alt="" className='cursor-pointer' />
                            </div>
                          })
                        }

                        <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2'>Add Lecture</div>

                      </div>
                    )
                  }
              </div>

            })
          }
          <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=>handleChapter("add")}>
            Add  Chapter
          </div>
          {
            showPopUp && (
              <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                <div className='bg-white text-gray-700 p-4 rounded relative w-full max-w-80'>
                <h2 className='text-lg font-semibold mb-4'>Add Lectures</h2>
                <div className='mb-2'>
                  <p>Lecture Title</p>
                  <input type="text" 
                  className='mt-1 block w-full border rounded py-1 px-2 '
                  value={ lectureDetails.lectureTitle}
                  onChange={(e)=>setLecturedetails({ ...lectureDetails,lectureTitle:e.target.value})}
                  />
                </div>

                 <div className='mb-2'>
                  <p>Lecture Duration</p>
                  <input type="number" 
                  className='mt-1 block w-full border rounded py-1 px-2 '
                  value={ lectureDetails.lectureDuration}
                  onChange={(e)=>setLecturedetails({ ...lectureDetails,lectureDuration:e.target.value})}
                  />
                </div>
                 <div className='mb-2'>
                  <p>Lecture URL</p>
                  <input type="text" 
                  className='mt-1 block w-full border rounded py-1 px-2 '
                  value={ lectureDetails.lectureUrl}
                  onChange={(e)=>setLecturedetails({ ...lectureDetails,lectureUrl:e.target.value})}
                  />
                </div>

                 <div className='mb-2'>
                  <p>Is preview Free</p>
                  <input type="checkbox" 
                  className='mt-1 block w-full border rounded py-1 px-2 '
                  value={ lectureDetails.isPreviewFree}
                  onChange={(e)=>setLecturedetails({ ...lectureDetails,isPreviewFree:e.target.checked})}
                  />
                </div>
                <button type='button' className=' w-full bg-blue-400 text-white px-4 py-2 rounded '>Add</button>

                <img src={assets.cross_icon} className=' absolute top-4 right-4 w-4 cursor-pointer'
                 onClick={()=>setPopUp(false)} alt="" />
                </div>

              </div>
            )
          }
        </div>

        <button type='submit' className=' bg-black text-white w-max py-2 px-8 rounded cursor-pointer my-4'> Add</button>

      </form>
      
    </div>
  )
}

export default AddCourse
