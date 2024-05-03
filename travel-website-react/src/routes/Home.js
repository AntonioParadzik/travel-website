import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Destination from '../components/Destination'
import Trip from '../components/Trip'
import Footer from '../components/Footer'
import axios from 'axios'
import { useEffect } from 'react'

function Home() {
    // useEffect(() => {
    //     axios
    //         .post('http://localhost:5000/api/new', {
    //             name: 'Product 1',
    //             price: 10,
    //             retailer: 'a',
    //             amountInStock: 2
    //         })
    //         .then((response) => {
    //             console.log(response.data) // Output: 'product created successfully'
    //         })
    //         .catch((error) => {
    //             console.error(error)
    //         })
    // }, [])

    return (
        <>
            <Navbar />
            <Hero
                cName="hero"
                heroImg={require('../assets/12.jpg')}
                title="Your Journey Your Story"
                text="Choose Your Favourite Destination."
                buttonText="Travel Plan"
                url="/"
                buttonClass="show"
            />
            <Destination />
            <Trip />
            <Footer />
        </>
    )
}

export default Home
