import './AllTripsStyles.css'
import React, { useState, useEffect } from 'react'
import TripData from './TripData'
import ShowTrip from './ShowTrip'
import axios from 'axios'

function AllTrips() {
    const [showModal, setShowModal] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [trips, setTrips] = useState([])

    const handleTripClick = (trip) => {
        setSelectedTrip(trip)
        setShowModal(true)
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/api')
            .then((response) => {
                setTrips(response.data) // Output: array of trips
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="trip">
            <h1>Discover Your Next Adventure</h1>

            <div className="all-tripcard">
                <div className="triprow">
                    {trips.map((trip) => (
                        <TripData
                            key={trip.id}
                            image={trip.image}
                            heading={trip.heading}
                            price={trip.price}
                            onClick={() => handleTripClick(trip)}
                        />
                    ))}
                </div>
            </div>
            {showModal && (
                <ShowTrip trip={selectedTrip} setShowModal={setShowModal} />
            )}
        </div>
    )
}

export default AllTrips
