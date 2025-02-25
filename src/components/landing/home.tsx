import React from 'react'
import Hero from "./hero"
import About from './about'
import Specialities from './specialities'
import Event from './event'

import HealthcareLayout from './healthservice'

function Homepage() {
  return (
    <div className=' overflow-hidden'>
      <Hero />
      <HealthcareLayout/>
      <About />
      <Specialities />
      <Event />
    </div>
  )
}

export default Homepage
