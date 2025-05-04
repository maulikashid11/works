import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avatar'
import { daysAgoFunction } from '../../utils/daysAgeFunction'
import { useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'

const JobDetails = () => {
    const { token, user } = useSelector(store => store.auth)
    const location = useLocation()
    const job = location.state
    const applyToJob = () => {
        fetch("https://works-vpbm.onrender.com/api/v1/user/applytojob", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "token": token
            },
            body: JSON.stringify({ jobId: job._id })
        }).then((res) => res.json()).
            then(data => {
                if (data.success) {
                    toast.success(data.message)
                }
            })

    }
    return (
        <div className='p-5'>
            <Avatar className="">
                <AvatarImage src={job.company.companyLogo} />
            </Avatar>
            <h1 className='text-3xl font-bold'>{job.title}</h1>
            <p className='text-lg '>{job.description}</p>
            <p className='text-lg '>Company: {job.company.name}</p>
            <p className='text-lg '>Salary: {job.salary}</p>
            <p className='text-lg '>Experience: {job.experience} yrs</p>
            <p className='text-lg '>Applicants: {job.applications.length}</p>
            <p className='text-lg '>Requirement : {job.requirement}</p>
            <p className='text-lg '>Posted : {daysAgoFunction(job.createdAt) === 0 ? 'today' : `${daysAgoFunction(job.createdAt)} days ago`}</p>
            <Button className="my-2 bg-blue-500" onClick={e => applyToJob()}>{job.applications.some(app => app.user._id === user._id) ? 'Applied' : 'Apply Now'}</Button>
        </div>
    )
}

export default JobDetails