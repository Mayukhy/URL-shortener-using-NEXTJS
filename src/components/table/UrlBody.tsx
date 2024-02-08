import React, { useEffect, useState } from 'react'
import Tooltip from '@mui/material/Tooltip'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useGetUrlsQuery } from '@/redux/api/api';

export default function UrlBody({
    item,singleUser,
    setOpen,
    urlIPdata,setUrlIPData,
    setDelOpen
  }) {

    const URLS = useGetUrlsQuery()
    const redirect=async()=>{
        await axios.put(`/api/url/${item?.smUrl}`,singleUser)
        .then(({data})=>{
         toast.success('Success')
         console.log('dat is here',data)
         URLS.refetch()
        })
        .catch(()=>{
         toast.error('Something went wrong')
        })
     
        await axios.get(`/api/url/short/${item?.smUrl}`)
        .then(({data})=>{
         // toast.success('Redirects')
         console.log('dat is here',data)
         URLS.refetch()
        })
        .catch(()=>{
         // toast.error('Something went wrong')
        })
     
       }

    

  return (
    <tr className="bg-zinc-800
    transition-all duration-200
  hover:bg-zinc-700 hover:text-white">
  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
  {item?.name?.length>13?item?.name?.slice(1,13) +'..':item?.name}
  </th>
  <td className="px-6 py-4">
  {item?.actualUrl?.length>100?item?.actualUrl?.slice(1,90) +'...':item?.actualUrl}
  </td>
  <td className="px-6 py-4">
      <Tooltip title="Copy">
      <a
      onClick={redirect}
      className=' hover:text-white' target="_blank" href={`/api/url/short/${item?.smUrl}`}>
  {item?.smUrl}
  </a>  
      </Tooltip>

  </td>
  <td className="px-6 py-4 text-center">
  {item?.visitHistory?.length || 0}
  </td>
  <td className="px-6 py-4 flex items-center gap-4 text-right">
    <Tooltip
    className='
    transition-all duration-200
    hover:bg-indigo-100 rounded-md p-0.5'
    title="Edit">
    <svg
    className=' scale-[1.7] font-medium text-blue-600 dark:text-blue-500 cursor-pointer'
          onClick={()=>{
            setUrlIPData({...urlIPdata,name:item?.name,actualUrl:item?.actualUrl,id:item?._id})
            setOpen(true)}}
    width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
    </Tooltip>

    <Tooltip
     className='
     transition-all duration-200
     hover:bg-indigo-100 rounded-md p-0.5'
    title="Delete">
    <svg
    className=' scale-[1.7] font-medium text-rose-600 cursor-pointer'
    onClick={()=>{
      setUrlIPData({...urlIPdata,name:item?.name,actualUrl:item?.actualUrl,id:item?._id})
      setDelOpen(true)}}
    width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </svg>
    </Tooltip>
  
      
  </td>
</tr>
  )
}
