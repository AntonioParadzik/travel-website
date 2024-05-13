import React from 'react'
import AboutUs from '../components/AboutUs'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import AllTrips from '../components/AllTrips'

function Trips() {
    return (
        <>
            <Navbar />
            <Hero
                cName="hero-mid"
                heroImg="https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                title="Choose Your Trip"
            />
            <AllTrips />
            <Footer />
        </>
    )
}

export default Trips
