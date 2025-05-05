import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, setUser } from '../../redux/authSlice'

const Navbar = () => {
  const { token, user } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(setToken(JSON.parse(localStorage.getItem('token')) || null))
    dispatch(setUser(JSON.parse(localStorage.getItem('user')) || null))
  }, [])
  const logout = async () => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    navigate('/')
  }
  return (
    <div className='fixed top-0 z-20 bg-white w-full h-[60px] p-3 border-1 border-b-zinc-600 flex gap-2 justify-between items-center'>
      <div className="logo font-bold text-xl">Works</div>
      <ul className='flex gap-4'>
        <li><Link to="/">Home</Link></li>
        {
          token &&
          (user?.role === 'user' ? (
            <li><Link to="/job">Jobs</Link></li>
          )
            : (
              <li><Link to="/companies">Companies</Link></li>

            ))
        }
      </ul>
      {
        token ?
          <div className='flex gap-2 items-center '>
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage className="border-1 rounded-full border-gray-600" src={user?.profilePic} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                {user?.role === 'user' && <Link to="/profile">View Profile</Link>}
                <div className='cursor-pointer' onClick={logout}>Logout</div>
              </PopoverContent>
            </Popover>
          </div> :
          <div>
            <Link className='bg-green-500 p-2 rounded-md' to="/login">Login</Link>
          </div>
      }
    </div>
  )
}

export default Navbar