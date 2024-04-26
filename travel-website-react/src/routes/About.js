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
                heroImg={require('../assets/night.jpg')}
                title="About"
            />
            <AboutUs />
            <Footer />
        </>
    )
}

export default About
