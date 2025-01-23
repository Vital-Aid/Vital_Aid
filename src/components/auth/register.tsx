"use client";

import React from 'react';
import { signIn,signOut } from 'next-auth/react'
import { FcGoogle } from "react-icons/fc";
import { useSession } from 'next-auth/react';
const Register = () => {
const {data}=useSession()
if(data){
    console.log(data);

}

    // const handleGoogleLogin = async () => {
    //     await signIn("google");
    // }

    return (
        <div className="flex justify-center items-center h-screen bg-white w-screen">
            <div className="h-5/6 w-5/6 shadow-xl rounded-lg overflow-hidden sm:w-4/6 sm:h-3/4 flex">
                <div className="hidden sm:block bg-gradient-to-tr from-emerald-700 to-green-400 w-1/2 h-full">
                    <p className='text-white font-serif mt-16 ml-14 font-bold text-xl'>Create an Account</p>
                    <div className='ml-14 mt-24 space-y-2 font-bold font-mono'>
                        <p >Join Us to Build a</p>
                        <p>Healthier Tomorrow -</p>
                        <p>Together , Every Step</p>
                        <p>Counts!</p>
                    </div>
                    <button className='w-fit p-1 bg-gray-200 text-black rounded-lg font-thin mt-14 ml-12'>Learn more</button>
                </div>
                <div className="bg-gray-300 h-full w-full sm:w-1/2 p-2 ">
              
                    <div className='w-fit p-3 text-black'>
                        <form className='space-y-4 p-2'>
                            <div className=''>
                                <label>Full Name</label><br />
                                <input type="text"
                                    className='border border-gray-500 w-64 h-10 pl-2'
                                /><br />
                            </div>
                            <div>
                                <label className='mt-'>Email</label><br />
                                <input type="text"
                                    className='border border-gray-500 w-64 h-10 pl-2'
                                /><br />
                            </div>
                            <div>
                                <label>Mobile Number <span></span></label><br />
                                <input type="text"
                                    className='border border-gray-500 w-64 h-10 pl-2'
                                /><br />
                            </div>
                            <div className=' w-fit space-y-4'>
                                <div>
                                    <label>Password</label><br />
                                    <input type="text" className='border border-gray-500 w-64 h-10 pl-2' />
                                </div>
                                <div>
                                    <label>Password</label><br />
                                    <input type="text" className='border border-gray-500 w-64 h-10' />
                                </div>
                            </div>
                        </form>
                        <div className='w-fit p-2 mt-3 space-y-5'>
                            <button className='w-64 bg-lime-600 h-10 font-bold text-white text-xl rounded-lg '>Create an account</button>
                            <button
                                type="button"
                                className="w-full bg-white border border-gray-300 text-black py-2 rounded-full hover:bg-gray-100 mb-2 text-sm"
                                onClick={() => {
                                    
                                    signIn('google');
                                }}
                            >
                                <FcGoogle size={25} className="mr-2 float-end" />
                                Continue with Google
                            </button>
                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Register;
