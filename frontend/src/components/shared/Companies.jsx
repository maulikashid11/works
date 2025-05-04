import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'

const Companies = () => {
  const [companies, setCompanies] = useState([])
  const { token, user } = useSelector(store => store.auth)
  useEffect(() => {
    async function getCompanies() {
      const res = await axios.get('https://works-vpbm.onrender.com/api/v1/company/get', {
        headers: {
          token
        },
      })
      setCompanies(res.data.companies)
    }
    getCompanies()
  }, [token])
  return (
    <div className='p-3'>
      <h1 className='text-xl font-bold'>Your companies</h1>
      <Link to="/create" className="m-2 bg-green-500 p-2 text-white inline-block rounded-md">Create Company</Link>
      <div>

        {
          companies.length > 0 ?
            companies.map((company) => (
              <Link to={`/companies/${company._id}`} className='company flex gap-4 my-3'>
                <Avatar className="border border-zinc-600 w-10 ">
                  <AvatarImage src={company?.companyLogo} />
                </Avatar>
                <p>{company.name}</p>
              </Link>
            )) : <div>No companies found </div>
        }
      </div>
    </div>
  )
}

export default Companies