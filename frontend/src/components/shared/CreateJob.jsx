import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const CreateJob = () => {

    const [details, setDetails] = useState({
        title: '',
        description: '',
        salary: '',
        experience: '',
        requirement: '',
    })
    const params = useParams()
    const { id } = params
    const navigate = useNavigate()
    const { token, user } = useSelector(store => store.auth);

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { title, description, salary, experience, requirement } = details
        try {
            const res = await axios.post("https://works-vpbm.onrender.com/api/v1/job/register", { title, description, salary, experience, requirement, companyId: id }, {
                headers: {
                    token
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate(`/companies/${id}`)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className={` min-h-screen pt-10 `}>
            <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md`}>
                <h1 className='text-center text-3xl font-bold'>Create Job </h1>

                <label className='block text-lg mt-5' htmlFor="title">Title:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.title} name='title' className='border w-full mt-1 rounded-md p-2' type="text" id='title' />

                <label className='block text-lg mt-5' htmlFor="description">Description:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.description} name='description' className='border w-full mt-1 rounded-md p-2' type="text" id='description' />

                <label className='block text-lg mt-5' htmlFor="salary">Salary:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.salary} name='salary' className='border w-full mt-1 rounded-md p-2' type="text" id='salary' />
                <label className='block text-lg mt-5' htmlFor="experience">Experience:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.experience} name='experience' className='border w-full mt-1 rounded-md p-2' type="text" id='experience' />

                <label className='block text-lg mt-5' htmlFor="requirement">Requirement:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.requirement} name='requirement' className='border w-full mt-1 rounded-md p-2' type="text" id='requirement' />

                <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Create Job</button>
            </form>
        </div>
    )
}

export default CreateJob