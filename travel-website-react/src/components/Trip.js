import './TripStyles.css'
import TripData from './TripData'
import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShowTrip from './ShowTrip'

function Trip() {
    const navigate = useNavigate()

    const [trips, setTrips] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)

    const handleTripClick = (trip) => {
        setSelectedTrip(trip)
        setShowModal(true)
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/api')
            .then((response) => {
                const allTrips = response.data
                const selectedTrips = []
                for (let i = 0; i < 3; i++) {
                    const randomIndex = Math.floor(
                        Math.random() * allTrips.length
                    )
                    selectedTrips.push(allTrips[randomIndex])
                    allTrips.splice(randomIndex, 1)
                }
                setTrips(selectedTrips)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="trip">
            <div className="trip-title">
                <h1>Discover Your Next Adventure</h1>
                <button onClick={() => navigate('/trips')} type="button">
                    View all
                </button>
            </div>
            <div className="tripcard">
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
            {showModal && (
                <ShowTrip trip={selectedTrip} setShowModal={setShowModal} />
            )}
        </div>
    )
}

export default Trip
