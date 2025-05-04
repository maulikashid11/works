import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { setToken, setUser } from '../../redux/authSlice';
import { toast } from 'sonner';

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [details, setDetails] = useState({
    email: '',
    password: '',
    role: ''
  })

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { email, password, role } = details
      const res = await axios.post('https://works-by4w.vercel.app/api/v1/user/login', { email, password, role })
      if (res.data.success) {
        dispatch(setToken(res.data.token))
        const user = await axios.get('https://works-by4w.vercel.app/api/v1/user/getuser', {
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
      <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md `}>
        <h1 className='text-center text-3xl font-bold'>Login</h1>
        <label className='block text-lg mt-5' htmlFor="email">Email:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.email} name='email' minLength={6} className='border w-full mt-1  rounded-md p-2' type="email" id='email' />
        <label className='block text-lg mt-5' htmlFor="password">Password:</label>
        <input onChange={(e) => { handleChange(e) }} value={details.password} name='password' minLength={5} className='border w-full mt-1  rounded-md p-2' type="password" id='password' />
        <div className='my-2'>
          <label htmlFor="role">Role: </label>
          <input type="radio" name="role" onChange={(e) => { handleChange(e) }} value="user" checked={details.role === 'user'} />
          <label className='mx-2' htmlFor="role">User</label>
          <input type="radio" name="role" onChange={(e) => { handleChange(e) }} value="recruiter" checked={details.role === 'recruiter'} />
          <label className='mx-2' htmlFor="role">Recruiter</label>
        </div>
        <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Login</button>
        <p className='mt-3'>Don't Have Account ? <Link className='text-blue-500 ' to="/signup">Create Account</Link></p>
      </form>
    </div>
  )
}

export default Login