import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'

const CompanyJobs = () => {
    const [jobs, setJobs] = useState([])
    const params = useParams()
    const { id } = params
    const { token, user } = useSelector(store => store.auth)
    useEffect(() => {
        if (token && id) {
            async function getJobs() {
                const res = await axios.get('https://works-vpbm.onrender.com/api/v1/job/getjobs', {
                    headers: {
                        token,
                    },
                    params: {
                        companyId: id
                    }
                }
                )
                setJobs(res.data.jobs)
            }
            getJobs()
        }
    }, [token])
    return (
        <div className='p-3'>
            <h1 className='text-xl font-bold'>Your posted Jobs</h1>
            <Link to={`/createjob/${id}`} className="m-2 bg-green-500 p-2 text-white inline-block rounded-md">Create jobs</Link>
            <div>
                {
                    jobs.length > 0 ?
                        jobs.map((job) => (
                            <Link key={job._id} to={`/companies/${id}/${job._id}`} state={job} className='company flex gap-4'>
                                <p>{job.title}</p>
                                <p>{job.applications.length}</p>
                            </Link>
                        )) : <div>No jobs found </div>
                }
            </div>
        </div>
    )
}

export default CompanyJobs