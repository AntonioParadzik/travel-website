import React, { useState, useEffect } from 'react'
import DestinationData from './DestinationData'
import './DestinationStyles.css'
import ShowTrip from './ShowTrip'
import axios from 'axios'

const Destination = () => {
    const [showModal, setShowModal] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [destination1, setDestination1] = useState(null)
    const [trip1, setTrip1] = useState(null)
    const [destination2, setDestination2] = useState(null)
    const [trip2, setTrip2] = useState(null)

    const handleTripClick = (trip) => {
        setSelectedTrip(trip)
        setShowModal(true)
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/randomDestination')
            .then((response) => {
                const [result1, result2] = response.data
                setTrip1(result1.trip)
                setDestination1(result1.destination)
                setTrip2(result2.trip)
                setDestination2(result2.destination)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="destination">
            <h1>Popular Destinations</h1>
            <p>
                Tours give you the opportunity to see a lot, within a time
                frame.
            </p>

            {destination1 && (
                <DestinationData
                    className="first-des"
                    heading={destination1.heading}
                    text={destination1.text}
                    img1={destination1.img1}
                    img2={destination1.img2}
                    button="View Plan"
                    onClick={() => handleTripClick(trip1)}
                />
            )}

            {destination2 && (
                <DestinationData
                    className="first-des-reverse"
                    heading={destination2.heading}
                    text={destination2.text}
                    img1={destination2.img1}
                    img2={destination2.img2}
                    button="View Plan"
                    onClick={() => handleTripClick(trip2)}
                />
            )}

            {showModal && (
                <ShowTrip trip={selectedTrip} setShowModal={setShowModal} />
            )}
        </div>
    )
}

export default Destination
