import React, { useEffect } from 'react'
import Url from './Url'
import axios from 'axios'
import UrlTable from '../table/UrlTable'

export default function UrlFeed({urlArray,singleUser,getAllUrls}) {
  
  return (
    <div className=' grid grid-cols-1  p-3'>
<UrlTable
getAllUrls={getAllUrls}
singleUser={singleUser}
urlArray={urlArray}
/>
    </div>
  )
}
