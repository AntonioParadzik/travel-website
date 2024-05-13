import React from 'react'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'

function About() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg="https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title="About"
            />
            <AboutUs />
            <Footer />
        </>
    )
}

export default About
