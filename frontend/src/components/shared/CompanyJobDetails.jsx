import React, { useRef } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { useLocation } from 'react-router-dom'
import { daysAgoFunction } from '../../utils/daysAgeFunction'
import { toast } from 'sonner'
import axios from 'axios'
import { useSelector } from 'react-redux'

const CompanyJobDetails = () => {
    const {token,user} = useSelector(store=>store.auth)
    const location = useLocation()
    const job = location.state
    const ref = useRef(null)

    const acceptApplication = async (id, status) => {
        try {
            if (status == "pending") {
                const res = await axios.post('http://localhost:3000/api/v1/job/accept', {
                    jobId: job._id,
                    userId: id
                }, {
                    headers: {
                        token
                    }
                })
                if(res.data.success){
                    ref.current.innerText = 'accepted'
                }
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
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

            <h1 className='text-2xl mt-5 font-bold text-gray-500'>Applicants</h1>
            <div className="applicants my-3">
                <div className="details flex justify-between">
                    <div>name</div>
                    <div>bio</div>
                    <div>resume</div>
                    <div>status</div>
                </div>
                {
                    job.applications.map((ap) => (

                        <div key={ap._id} className="details flex justify-between">
                            <div>{ap.user.fullname}</div>
                            <div>{ap.user.bio}</div>
                            <a href={ap.user.resume}>resume</a>
                            <div className='cursor-pointer' ref={ref} onClick={e=>acceptApplication(ap.user._id, ap.status)}>{ap.status}</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default CompanyJobDetails