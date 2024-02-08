'use client'

import { setActiveMenue } from '@/redux/slices/urlSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Charts from '../../../components/chart/Charts'
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { useGetUrlsQuery } from '@/redux/api/api'
import UrlFeed from '@/components/urlfeed/UrlFeed'
import { useRouter } from 'next/navigation'

interface Url {
  _id: string;
  userId: string;
  visitHistory: string[];
  name: string;
}

interface User {
  _id: string;
}

export default function page() {
  const { activeMenue } = useSelector((state: any) => state.url)
  const { data: urls } = useGetUrlsQuery()
  const dispatch = useDispatch()
  const [singleUser, setSingleUser] = useState<User | null>(null)
  const session = useSession()
  
  //getting current user data
  useEffect(() => {
    const getSingleUser = async () => {
      await axios.get(`/api/user/${session?.data?.user?.email}`)
        .then(({ data }) => {
          setSingleUser(data)
        })
    }
    getSingleUser()
  }, [session?.data?.user])
  
  console.log(singleUser)
  
  useEffect(() => {
    dispatch(setActiveMenue("Dashbord"))
  }, [activeMenue])
  
  //filtering those urls which is created by the current user
  const myUrls = urls?.filter((item: Url, id: number) => item?.userId === singleUser?._id)
  
  const visiteHistory = myUrls?.map((url: Url) => {
    if (url?.userId === singleUser?._id) {
      return url?.visitHistory?.length
    }
  })
  
  const urlNames = myUrls?.map((url: Url) => {
    if (url?.userId === singleUser?._id) {
      return url?.name
    }
  })
  
  const router = useRouter()
  
  useEffect(() => {
    if (session?.status !== 'authenticated') {
      router.push('/')
    }
  }, [session])
  
  return (
    <div className=' w-full h-screen overflow-y-auto scroll-smooth'>
      <p className=' font-bold text-3xl pt-5 px-5 mb-[-10px]'>Analitics</p>
      <Charts
        urls={myUrls}
        urlNames={urlNames}
        visiteHistory={visiteHistory}
        singleUser={singleUser}
      />
  
      {
        myUrls?.length > 0 ?
          <>
            <p className=' font-bold text-2xl pt-5 px-5'>Your Created Urls</p>
            <UrlFeed
              urlArray={myUrls}
              singleUser={singleUser}
            />
          </> :
          <div className=' w-full flex flex-col justify-center items-center mt-2'>
            <img
              className=' w-[450px] object-cover h-[240px] rounded-xl'
              src="https://img.freepik.com/free-vector/hand-drawn-no-data-illustration_23-2150544955.jpg?w=740&t=st=1707387279~exp=1707387879~hmac=d3556129e0ec981130ed63ce64805c0ad874cd3db05e20a315edd4d8f22a6723" alt="" />
            <p className=' font-semibold text-lg'>No Urls are created yet</p>
          </div>
      }
      <br />
    </div>
  )
}