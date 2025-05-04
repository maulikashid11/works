import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, AvatarImage } from '../ui/avatar'
import { daysAgoFunction } from '../../utils/daysAgeFunction'
import axios from 'axios'
const Job = () => {
    const [jobs, setJobs] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        async function getJobs() {
            const res = await axios.get('https://works-vpbm.onrender.com/api/v1/job/getalljobs')
            setJobs(res.data.jobs)
        }
        getJobs()
    }, [])
    return (
        <div className='flex w-full '>
            <div className="jobs w-full p-2">
                <h1 className='text-3xl font-bold '>Jobs</h1>
                <div className='my-5 mx-auto w-[60%]'>
                    <input type="text" className="border border-zinc-500 rounded-full p-3 font-bold text-xl w-full" placeholder='Search your dream job' onChange={e => setQuery(e.target.value)} value={query} />
                </div>
                <div className="job-container p-5 mt-3 flex gap-5 flex-wrap ">
                    {
                        jobs.map((job) => (
                            job.title.includes(query.toLowerCase()) &&
                            <Link key={job._id} to={`/jobdetails/${job._id}`} state={job} className="job rounded-md hover:scale-[1.04] duration-100 cursor-pointer border-1 w-60 h-70 p-3 bg-white">
                                <div className='flex justify-between '>
                                    <Avatar className="">
                                        <AvatarImage src={job.company.companyLogo} />
                                    </Avatar>
                                    <p>{daysAgoFunction(job.createdAt) === 0 ? 'today' : `${daysAgoFunction(job.createdAt)} days ago`}</p>
                                </div>
                                <p className='text-md my-1'>{job.company.name}</p>
                                <div>
                                    <p className='text-lg font-semibold'>{job.title}</p>
                                    <p className='text-sm font-bold text-gray-500'>{job.description}</p>
                                </div>
                                <div className='flex justify-between my-5 items-center'>
                                    <p className='rounded-full w-15 text-center bg-yellow-500 p-1 text-sm'>{job.salary}</p>
                                    <p className='rounded-full w-15 text-center bg-blue-500 p-1 text-sm'>{job.experience} yrs</p>
                                    <p className='rounded-full w-15 text-center bg-green-500 p-1 text-sm'>{job.requirement}</p>
                                </div>
                            </Link>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default Job