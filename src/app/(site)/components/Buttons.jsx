import { Button } from '@mui/joy'
import React from 'react'
export default function Buttons({varient,handleSubmit}) {
  return (
    <div>
{varient ==='Login'?
<Button onClick={handleSubmit} className=' bg-indigo-500 w-full' variant='solid'>
  Sign In
</Button>:
<Button onClick={handleSubmit} className=' bg-indigo-500 w-full' variant='solid'>
  Register
</Button>
}
    </div>
  )
}
