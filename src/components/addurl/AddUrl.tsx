import React from 'react'
import getSession from '@/app/actions/getSession'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { Tooltip, Typography } from '@mui/material'
import AddModal from './AddModel'

export default  function AddUrl({urlIPdata,setUrlIPData,addUrl,singleUser}) {
    // const session = await getSession()
    // console.log(session)

  return (
    <div className='
    transition-all duration-200
   flex flex-col gap-1 p-4 items-center hover:bg-zinc-700 rounded-lg'>
<AddModal 
singleUser={singleUser}
urlIPdata={urlIPdata}
setUrlIPData={setUrlIPData}
addUrl={addUrl}/>
<p className=' text-center text-xs'>Add New Url</p>
    </div>
  )
}
