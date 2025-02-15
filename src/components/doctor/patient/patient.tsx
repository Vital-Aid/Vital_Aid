"use client"
import React from 'react'
import { useParams } from 'next/navigation'

function Patient() {
    const {userid} =useParams()
    console.log(userid);
    
    
  return (
    <div>
      
    </div>
  )
}

export default Patient
