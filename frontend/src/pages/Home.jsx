import React from 'react'
import Hero from '../components/home/Hero'
import HowItWorks from '../components/home/HowItWorks'
import Categories from '../components/home/Categories'
import Stats from '../components/home/Stats'
import CTA from '../components/home/CTA'

const Home = () => {
  return (
    <main className="min-h-screen">
        <Hero/>
        <HowItWorks/>
        <Categories/>
        <Stats/>
        <CTA/>
    </main>
  )
}

export default Home
