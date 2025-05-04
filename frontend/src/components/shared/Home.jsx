import React, { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import axios from 'axios'
import { daysAgoFunction } from '../../utils/daysAgeFunction'

const Home = () => {
  const [jobs, setJobs] = useState([])
  const [query, setQuery] = useState('')
  useEffect(() => {
    async function getJobs() {
      const res = await axios.get('http://localhost:3000/api/v1/job/getalljobs')
      setJobs(res.data.jobs)
    }
    getJobs()
  }, [])
  return (
    <div className='p-5 w-full relative h-screen'>
      <img className='fixed top-0 inset-0 z-1 w-full h-full' src="../../../src/assets/hero image.webp" alt="" />
      <div className='fixed top-0 w-full h-full bg-white/75 bg-opacity-500  inset-0 z-2'></div>
      <div className='absolute inset-0 z-3 p-5'>
        <h1 className='text-5xl font-bold '>Work<span className='text-red-500'>s</span></h1>
        <p className="text-3xl text-zinc-900 text-center my-7">Find best opportunities for work and dream job</p>
        <div className='my-10 mx-auto w-[50%] flex gap-10'>
          <input type="text" className="border border-zinc-500 rounded-full p-3 font-bold text-xl w-full" placeholder='Search your dream job' onChange={e => setQuery(e.target.value)} value={query} />
        </div>

        <div>
          <h1 className='text-3xl mt-10'>Latest Jobs</h1>
          <div className="job-container p-5 flex gap-5 flex-wrap">
            {
              jobs.slice(0, 6).map((job) => (
                job.title.includes(query.toLowerCase()) &&
                <div key={job._id} className="job rounded-md shadow-2xl w-60 h-70 p-3 bg-white">
                  <div className='flex justify-between '>
                    <Avatar className="border border-zinc-600">
                      <AvatarImage src={job.company?.companyLogo} />
                    </Avatar>
                    <p>{daysAgoFunction(job.createdAt) === 0 ? 'today' : `${daysAgoFunction(job.createdAt)} days ago`} </p>
                  </div>
                  <p className='text-md my-1'>{job.company?.logo}</p>
                  <div>
                    <p className='text-lg font-semibold'>{job.title}</p>
                    <p className='text-sm font-bold text-gray-500'>{job.description}</p>
                  </div>
                  <div className='flex justify-between my-5 items-center'>
                    <p className='rounded-full w-15 text-center bg-yellow-500 p-1 text-sm'>{job.salary}</p>
                    <p className='rounded-full w-15 text-center bg-blue-500 p-1 text-sm'>{job.experience} yrs</p>
                    <p className='rounded-full w-15 text-center bg-green-500 p-1 text-sm'>{job.requirement}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home