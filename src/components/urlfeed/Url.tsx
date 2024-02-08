import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

export default function Url({item,idx,singleUser}) {

  const redirect=async()=>{
   await axios.put(`/api/url/${item?.smUrl}`,singleUser)
   .then(({data})=>{
    toast.success('Success')
    console.log('dat is here',data)
   })
   .catch(()=>{
    toast.error('Something went wrong')
   })

   await axios.get(`/api/url/short/${item?.smUrl}`)
   .then(({data})=>{
    // toast.success('Redirects')
    console.log('dat is here',data)
   })
   .catch(()=>{
    // toast.error('Something went wrong')
   })

  }
  return (
    <div
    className=' hover:translate-y-[-2px]
     transition-all duration-200 cursor-pointer
    p-4 bg-zinc-600 rounded-lg'>
      
      <div className='flex mb-2.5 justify-between'>
      <a target="_blank" href={`/api/url/short/${item?.smUrl}`}>
                        
      <span 

onClick={redirect}
      className='
      transition-all duration-200 cursor-pointer hover:bg-zinc-50
      py-1.5 px-3.5 rounded-3xl bg-zinc-300 text-black'>{item?.smUrl || 'Small url'}</span>
    </a>
    <span
          className='
          transition-all duration-200 cursor-pointer hover:bg-indigo-100
          py-1.5 px-3.5 rounded-3xl bg-indigo-200 text-black'
    >{item?.name}</span>
    </div>
    
    <span className='
      transition-all duration-200 cursor-pointer hover:bg-zinc-50
      py-1.5 px-3.5 rounded-3xl bg-zinc-200 text-black'>{item?.actualUrl}</span>
      
    </div>
  )
}
