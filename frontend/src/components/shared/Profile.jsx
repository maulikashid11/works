import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

const Profile = () => {
  const { token, user } = useSelector(store => store.auth)
  const [jobs, setJobs] = useState([])
  useEffect(() => {
    async function getJobs() {
      const res = await axios.get('https://works-vpbm.onrender.com/api/v1/job/getalljobs')
      setJobs(res.data.jobs)
    }
    getJobs()
  }, [])
  return (
    <div className='p-5 text-lg'>
      <h1 className='text-3xl mb-5'>Profile</h1>
      <Avatar >
        <AvatarImage src={user?.profilePic} />
      </Avatar>
      <p>{user?.fullname}</p>
      <p>{user?.email}</p>
      <p className='text-md text-gray-500'>{user?.bio}</p>
      {user?.experience &&
        <p>Experience : {user?.experience} years</p>
      }
      <div className='flex gap-2'>
        {
          user?.skills.map((el) => (
            <p className='rounded-full bg-yellow-200 p-2 text-sm'>{el}</p>
          ))
        }
      </div>
      <a href={user?.resume} target="_blank" className='text-blue-500'>Resume</a>
      <div>
        <Link to="/update">Update Profile</Link>
      </div>
      <div className='w-full mt-5'>
        <h1>Your applied jobs </h1>
        <table className='w-full'>
          <tr>
            <th className='text-start'>Company</th>
            <th className='text-start'>Name</th>
            <th className='text-start'>Status</th>
          </tr>
          {
            jobs?.filter((job) => job.applications.some((ap) => ap.user._id === user._id)).map((job) => {
              const index = job.applications.findIndex((ap) => ap.user._id === user._id)
              return <tr>
                <td>
                  <Avatar >
                    <AvatarImage src={job.company.companyLogo} />
                  </Avatar>
                </td>
                <td>{job.title}</td>
                <td>{job.applications[index].status}</td>
              </tr>
            })
          }
        </table>
      </div>
    </div>
  )
}

export default Profile