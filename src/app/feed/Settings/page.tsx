'use client'
import UrlTable from '@/components/table/UrlTable'
import { useGetUrlsQuery } from '@/redux/api/api'
import { setActiveMenue } from '@/redux/slices/urlSlice'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function page() {

  const {activeMenue} = useSelector(state=>state.url)
  const {data:urls} = useGetUrlsQuery()
  const [singleUser,setSingleUser] = useState(null)

  const session = useSession()

  //getting current user data
  useEffect(()=>{
    const getSingleUser = async()=>{
      await axios.get(`/api/user/${session?.data?.user?.email}`)
      .then(({data})=>{
        setSingleUser(data)
      })
    }
    getSingleUser()
    },[session?.data?.user])
    console.log(singleUser)

    //filtering those urls which is created by the current user
const myUrls = urls?.filter((item,id)=>item?.userId === singleUser?._id )
const dispatch = useDispatch()
useEffect(()=>{
dispatch(setActiveMenue("Settings"))
},[activeMenue])

const router = useRouter()

useEffect(()=>{
if (session?.status !== 'authenticated') {
  router.push('/')
}
},[session])

  return (
    <div className=' w-full h-screen px-5 overflow-y-auto scroll-smooth'>
          <p className=' font-bold text-3xl pt-5 mb-[-10px]'>Settings</p>
<br />
    
{
myUrls?.length > 0 ?
<UrlTable
      singleUser={singleUser}
      urlArray={myUrls}
      />:
      <div className=' w-full p-4 flex flex-col justify-center items-center mt-2'>
          
      <img
      className=' w-1/3 object-cover h-[50vh] rounded-xl'
      src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544955.jpg?w=740&t=st=1707387279~exp=1707387879~hmac=d3556129e0ec981130ed63ce64805c0ad874cd3db05e20a315edd4d8f22a6723" alt="" />
      <p className=' font-bold text-xl mt-1'>No Urls are created yet</p>
    </div>
      }
    </div>
  )
}
