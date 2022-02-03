import React from 'react';
import { signIn } from 'next-auth/react'

function Login() {
  return (
    <div className="-mt-14 flex justify-center items-center xl:max-w-4xl md:max-w-3xl m-auto min-h-screen">
      <div className="flex flex-col justify-center items-center border rounded-lg shadow-lg bg-white p-10">
        <h1 className="font-extrabold text-gray-800 px-0 sm:px-4 md:px-0 text-3xl sm:text-4xl xl:text-5xl mb-2 md:mb-3 lg:mb-4 tracking-tighter md:leading-5 ">Access Denied.</h1>
        <h4 className="md:text-lg text-center text-base font-medium mb-6 md:mb-12 leading-3 lg:leading-3 ">Please sign in to continue..</h4>
        <button onClick={signIn} className="hover:scale-110 transition-all duration-150 ease-out font-bold py-2 w-1/2 text-white bg-gray-600 rounded-lg cursor-pointer">Sign In</button>
      </div>    
    </div>
  );
}

export default Login;
