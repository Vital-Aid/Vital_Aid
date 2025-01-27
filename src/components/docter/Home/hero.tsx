'use client'
import Image from 'next/image';
import React from 'react';
import Doctor from "../../../../public/Doctor.png";
import { useAppSelector } from '@/lib/store/hooks';


function Hero() {
  // const user=useAppSelector((state)=>state.auth)
  // console.log('gdchsg',user.user?.profileImage?.thumbnail);
  const username=localStorage.getItem('username')
  
  return (
    <div className="bg-white h-screen w-screen flex items-center justify-center shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-72">
        <div className="text-center md:text-left">
          <h1 className="text-1xl mt-0 md:text-3xl font-thin font-serif text-green-500">
            Welcome <br />
           Doctor {username&&username}
          </h1>
        </div>

        <div className="mr-4"> 
          <Image
            src={Doctor}
            alt="Doctor illustration"
            width={450}
            height={400}
            className=" mr-20 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
