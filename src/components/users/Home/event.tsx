"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Event = () => {


  const images = [
    'https://i.pinimg.com/736x/19/30/13/1930135ee96848f42834fa2072b51bcd.jpg',
    'https://i.pinimg.com/736x/d8/17/31/d817317f9169f9ffab3b24caf25f01fe.jpg',
    'https://i.pinimg.com/736x/13/43/a0/1343a070c9783291ae1523100e7ea0b5.jpg',
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className='relative'>
      <div className='opacity-65' >
        <Image src={images[currentImageIndex]} alt="Image Slider" width={300} height={300} className='w-full h-[500px]' />
        <Link href={"/login"} className='absolute bottom-4 right-4 bg-white p-4 rounded-md shadow-md hover:cursor-pointer'>
          <p className='text-sm font-bold pl-4'>our events</p>
          <p className='text-sm font-bold border-2 p-3 rounded-md border-lime-700'>Learn More</p>
        </Link>
      </div>
    </div>
  );
};

export default Event;
