"use client";

import React from 'react'
import TextField from '@mui/material/TextField';
import {Input} from '@mui/joy'
export default function Inputs({varient,loginFormData,setLoginFormData,registerFormData,setRegisterFormData,setNotconfirmPass,notconfirmPass,confirmPass,setConfirmPass}) {
  
  console.log(registerFormData)
    return (
    <div className=' mt-5 flex mx-w-[300px] flex-col gap-4'>
{ varient === "Login" &&

<>
<Input
placeholder='Username'
sx={{
      bgcolor:'transparent',
      color:'whitesmoke'
}}
required
value={loginFormData?.username}
onChange={(e)=>setLoginFormData({...loginFormData,username:e.target.value})}
      type='text'
 />

<Input
sx={{
      bgcolor:'transparent',
      color:'whitesmoke'
}}
placeholder='Password'
required
value={loginFormData?.password}
onChange={(e)=>setLoginFormData({...loginFormData,password:e.target.value})}
      type='password'
      id="outlined-basic" label="Password" variant="outlined" />
      
      </>
      }

{ varient === "Register" &&

<>
<Input

sx={{
      bgcolor:'transparent',
      color:'whitesmoke'
}}
placeholder='Username'
required
value={registerFormData?.username}
onChange={(e)=>
      setRegisterFormData({...registerFormData,username:e.target.value})}
      type='text'
      color='primary'
      id="outlined-basic" label="User Name" variant="outlined" />

<Input
sx={{
      bgcolor:'transparent',
      color:'whitesmoke'
}}
placeholder='Email'
required
value={registerFormData?.email}
onChange={(e)=>setRegisterFormData({...registerFormData,email:e.target.value})}
      color='primary'
      type='text'
      id="outlined-basic" label="Email" variant="outlined" />

<Input
sx={{
      bgcolor:'transparent',
      color:'whitesmoke'
}}
placeholder='Password'
required
value={registerFormData?.password}
error={notconfirmPass?true:false}
onChange={(e)=>setRegisterFormData({...registerFormData,password:e.target.value})}
      type='password'
      color='primary'
      id="outlined-basic" label="Password" variant="outlined" />

<Input
sx={{
      bgcolor:'transparent',
      color:'whitesmoke'
}}
placeholder='Confirm Password'
required
value={confirmPass}
error={notconfirmPass?true:false}
onChange={(e)=>{
    setConfirmPass(e.target.value)
    if (registerFormData?.password !== e.target.value) {
        setNotconfirmPass(true)    
    }
    else 
        setNotconfirmPass(false)   
    
     

}}
      color='primary'
      type='password' />
      
      </>
      }

    </div>
  )
}
