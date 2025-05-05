import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'

const Create = () => {

    const [details, setDetails] = useState({
        name: '',
        website: '',
        location: '',
        file: '',
    })
    const navigate = useNavigate()
    const { token, user } = useSelector(store => store.auth);

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setDetails({ ...details, file: e.target.files?.[0] });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const { name, website, location, file } = details
            const formData = new FormData()
            formData.append("name", name)
            formData.append("website", website)
            formData.append("location", location)
            formData.append("file", file)

            const res = await axios.post("https://works-vpbm.onrender.com/api/v1/company/register", formData, {
                headers: {
                    "Content-type": "multipart/form-data",
                    token
                }
            })
            if (res.data.success) {
                toast.success(res.data.message)
                navigate('/companies')
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    return (
        <div className={` min-h-screen pt-10 `}>
            <form onSubmit={(e) => handleSubmit(e)} className={`p-5 px-10 border md:w-[50%] mx-auto rounded-md`}>
                <h1 className='text-center text-3xl font-bold'>Create company</h1>

                <label className='block text-lg mt-5' htmlFor="name">Name:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.name} name='name' className='border w-full mt-1 rounded-md p-2' type="text" id='name' />

                <label className='block text-lg mt-5' htmlFor="website">Website:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.website} name='website' className='border w-full mt-1 rounded-md p-2' type="text" id='website' />

                <label className='block text-lg mt-5' htmlFor="location">Location:</label>
                <input onChange={(e) => { handleChange(e) }} value={details.location} name='location' className='border w-full mt-1 rounded-md p-2' type="text" id='location' />


                <label className='block text-lg mt-5' htmlFor="file">Company Logo:</label>
                <input onChange={(e) => { changeFileHandler(e) }} name='file' className='border w-full mt-1 rounded-md p-2' type="file" id='file' />

                <button className='bg-blue-500 text-white font-bold block p-2 rounded-md mt-5 cursor-pointer'>Create Company</button>
            </form>
        </div>
    )
}

export default Create