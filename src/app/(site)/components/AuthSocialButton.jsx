import React from 'react'

export default function AuthSocialButton({icon,socialAction}) {
  return (
    <button
    onClick={socialAction} 
      className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white 
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-50 
        focus:outline-offset-0
      "
    >
      {icon}
    </button>
  )
}
