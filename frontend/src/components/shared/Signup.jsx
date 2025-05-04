import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setToken, setUser } from '../../redux/authSlice'
import { toast } from 'sonner'

const Signup = () => {

  const [details, setDetails] = useState({
    fullname: '',
    email: '',
    password: '',
    role: '',
    file: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setDetails({ ...details, file: e.target.files?.[0] });
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { fullname, email, password, role, file } = details
      const formData = new FormData()
      formData.append("fullname", fullname)
      formData.append("email", email)
      formData.append("password", password)
      formData.append("role", role)
      formData.append("file", file)
      const res = await axios.post("http://localhost:3000/api/v1/user/signup", formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      })

      if (res.data.success) {
        dispatch(setToken(res.data.token))
        const user = await axios.get('http://localhost:3000/api/v1/user/getuser', {
          headers: {
            "Content-Type": "application/json",
            token: res.data.token
          }
        })
        dispatch(setUser(user.data.user))
        toast.success(res.data.message)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className={` min-h-screen pt-10 `}>
      <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md`}>
        <h1 className='text-center text-3xl font-bold'>Sign Up</h1>
        <label className='block text-lg mt-5' htmlFor="fullname">Fullname:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.fullname} name='fullname' minLength={5} className='border w-full mt-1 rounded-md p-2' type="text" id='fullname' />
        <label className='block text-lg mt-5' htmlFor="email">Email:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.email} name='email' minLength={5} className='border w-full mt-1 rounded-md p-2' type="email" id='email' />
        <label className='block text-lg mt-5' htmlFor="password">Password:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.password} name='password' minLength={5} className='border w-full mt-1 rounded-md p-2' type="password" id='password' />

        <label className='block text-lg mt-5' htmlFor="file">Profile:</label>
        <input onChange={(e) => { changeFileHandler(e) }} name='file' className='border w-full mt-1 rounded-md p-2' type="file" id='file' />

        <div className='my-2'>
          <label htmlFor="role">Role: </label>
          <input type="radio" name="role" onChange={(e) => { handleChange(e) }} value="user" checked={details.role === 'user'} />
          <label className='mx-2' htmlFor="role">User</label>
          <input type="radio" name="role" onChange={(e) => { handleChange(e) }} value="recruiter" checked={details.role === 'recruiter'} />
          <label className='mx-2' htmlFor="role">Recruiter</label>
        </div>
        <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Create Account</button>
        <p className='mt-3'>Already have account ? <Link className='text-blue-500 ' to="/login">Login</Link></p>
      </form>
    </div>
  )
}

export default Signup