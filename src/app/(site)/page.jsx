'use client'

import AuthForm from './components/AuthForm'
import 'react-toastify/dist/ReactToastify.css';
export default function Home() {
  return (
<div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>

<div className=' sm:mx-auto sm:w-full sm:max-w-md'>

<img
className=' mx-auto w-[50px] h-[50px]'
src="https://m.media-amazon.com/images/I/41mg82a773L.png" alt="logo" />
<h2 className=' mt-6 text-center text-3xl font-bold tracking-tight text-gray-100'>
  Sign in to your account
</h2>

</div>
<AuthForm/>
</div>
  )
}
