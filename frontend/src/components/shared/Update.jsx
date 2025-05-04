import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUser } from '../../redux/authSlice'
import { toast } from 'sonner'

const Update = () => {

  const [details, setDetails] = useState({
    fullname: '',
    email: '',
    bio: '',
    experience: '',
    skills: '',
    file: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token, user } = useSelector(store => store.auth)
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setDetails({ ...details, file: e.target.files?.[0] });
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { fullname, email, salary, bio, experience, skills, file } = details
      const formData = new FormData()
      formData.append("fullname", fullname)
      formData.append("email", email)
      formData.append("skills", skills)
      formData.append("salary", salary)
      formData.append("bio", bio)
      formData.append("experience", experience)
      formData.append("file", file)
      const res = await axios.post("https://works-vpbm.onrender.com/api/v1/user/update", formData, {
        headers: {
          "Content-type": "multipart/form-data",
          token
        }
      })
      if (res.data.success) {
        const user = await axios.get('https://works-vpbm.onrender.com/api/v1/user/getuser', {
          headers: {
            token
          }
        })
        dispatch(setUser(user.data.user))
        toast.success(res.data.message)
        navigate('/profile')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className={` min-h-screen pt-10 `}>
      <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md`}>
        <h1 className='text-center text-3xl font-bold'>Update Profile</h1>
        <label className='block text-lg mt-5' htmlFor="fullname">Fullname:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.fullname} name='fullname' minLength={5} className='border w-full mt-1 rounded-md p-2' type="text" id='fullname' />

        <label className='block text-lg mt-5' htmlFor="email">Email:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.email} name='email' minLength={5} className='border w-full mt-1 rounded-md p-2' type="email" id='email' />

        <label className='block text-lg mt-5' htmlFor="bio">bio:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.bio} name='bio' minLength={5} className='border w-full mt-1 rounded-md p-2' type="text" id='bio' />
        <label className='block text-lg mt-5' htmlFor="skills">skills:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.skills} name='skills' minLength={5} className='border w-full mt-1 rounded-md p-2' type="text" id='skills' />
        <label className='block text-lg mt-5' htmlFor="experience">Experience:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.experience} name='experience' className='border w-full mt-1 rounded-md p-2' type="text" id='experience' />

        <label className='block text-lg mt-5' htmlFor="file">Resume:</label>
        <input onChange={(e) => { changeFileHandler(e) }} name='file' className='border w-full mt-1 rounded-md p-2' type="file" id='file' />

        <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Update</button>
      </form>
    </div>
  )
}

export default Update