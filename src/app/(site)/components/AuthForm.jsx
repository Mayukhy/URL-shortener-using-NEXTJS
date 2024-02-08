'use client';
import axios from 'axios';
import { signIn, useSession } from 'next-auth/react';

import React, { useEffect, useState } from 'react'
// import GoogleIcon from '@mui/icons-material/Google';
// import GitHubIcon from '@mui/icons-material/GitHub';

import { useRouter } from "next/navigation";
import Buttons from './Buttons';
// import AuthSocialButton from './AuthSocialButton';
import { toast } from 'react-toastify';
import Inputs from './input/Inputs';
export default function AuthForm() {
    const router = useRouter()
    const session = useSession()
    const [loginFormData,setLoginFormData] = useState({username:'',password:''})
    const [registerFormData,setRegisterFormData] = useState({username:'',email:'',password:''})
    const [notconfirmPass,setNotconfirmPass] = useState(false)
    const [confirmPass,setConfirmPass] = useState('')
    const [snackPack, setSnackPack] = useState([]);
    const [open, setOpen] = useState(false);
    const [messageInfo, setMessageInfo] = useState(undefined);
    
    useEffect(() => {
      if (session?.status === 'authenticated') {
        router.push('/feed')
      }
    }, [session?.status, router]);

  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    const handleExited = () => {
      setMessageInfo(undefined);
    };

    const authState = [
        "Login",
        "Register"
    ]
    const [varient,setVarient] = useState("Login")


    // For Login & Registration
    const handleSubmit=(message)=>{
    if (varient ==="Login") {
        //next Auth
        signIn('credentials', {
          ...loginFormData,
          redirect: false
        })
        .then((callback) => {
          if (callback?.error) {
            if (loginFormData?.username ==='' || loginFormData?.password ==='') {
              toast.error('Please fill all the fields')
            }
            else
            toast.error('Invalid credencials')

          }
  
          if (callback?.ok && !callback?.error) {
            toast.success('Login Successfull')
            router.push('/feed')
          }
        })
    }
    if (varient ==="Register") {
        //next Auth

        if (!notconfirmPass) {
          const register= ()=>{
            axios.post('/api/register',registerFormData)
              .then(({data})=>{
                console.log(data)
                message = "Registration Successfull !"
                setRegisterFormData({username:'',email:'',password:''})
                setConfirmPass('')
                setVarient("Login")
                toast.success(message)
              })
              .catch(()=>
              {
              message = "Please fill all the fields"
              toast.error(message)
              }
              
              )
            }
            register() 
        }
        else
        {
          toast.error('Password is not matched')}
    }
    }

  return (
    <div className=' sm:w-full sm:max-w-md my-6 sm:mx-auto'>
    <div className=' bg-zinc-800 px-4 py-8 shadow sm:rounded-lg sm:px-10'>
        <div className=' mx-auto flex gap-2 justify-center'>
            {authState?.map((state)=>(
                <div
                onClick={()=>setVarient(state)}
                className={varient === state ?' bg-indigo-500 rounded-md cursor-pointer text-white py-1.5 px-4 font-bold duration-200 transition-all':'py-1.5 cursor-pointer font-semibold px-4 hover:bg-indigo-100 hover:text-black rounded-md duration-200 transition-all'}>
                    {state}
                </div>
            ))}
        </div>
        
      <form className=' space-y-6'
      >
    <Inputs confirmPass={confirmPass} setConfirmPass={setConfirmPass} notconfirmPass={notconfirmPass} setNotconfirmPass={setNotconfirmPass} loginFormData={loginFormData} setLoginFormData={setLoginFormData} registerFormData={registerFormData} setRegisterFormData={setRegisterFormData} varient={varient}/>

    <Buttons handleSubmit={()=>handleSubmit('msg')} varient={varient}/>

      </form>

      {/* <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <AuthSocialButton socialAction={socialAction}
              icon={<GoogleIcon/>} 
              onClick={() =>socialAction('google')} 
            />
            <AuthSocialButton socialAction={()=>socialAction('github')}
              icon={<GitHubIcon/>} 
              
            />
          </div>
        </div> */}
        <div 
          className="
            flex 
            gap-2 
            justify-center 
            text-sm 
            mt-6 
            px-2 
            text-gray-200
          "
        >
          <div>
            {varient === 'Login' ? "New to Url Shorter?" : 'Already have an account?'} 
          </div>
          <div 
            onClick={()=>{
                if (varient ==="Login") {
                    setVarient("Register")
                }
                else
                setVarient("Login")
            }} 
            className="underline cursor-pointer"
          >
            {varient === 'Login' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>

    </div>
  )
}
