import React from 'react'
import Navbar from '../components/shared/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='relative top-[60px]'>
                <Outlet />
            </div>
        </>
    )
}

export default Home