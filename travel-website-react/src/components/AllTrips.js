import './AllTripsStyles.css'
import React, { useState, useEffect } from 'react'
import TripData from './TripData'
import ShowTrip from './ShowTrip'
import axios from 'axios'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function AllTrips() {
    const [showModal, setShowModal] = useState(false)
    const [selectedTrip, setSelectedTrip] = useState(null)
    const [trips, setTrips] = useState([])
    const [filteredTrips, setFilteredTrips] = useState([])
    const [priceFilter, setPriceFilter] = useState('all')

    const handleTripClick = (trip) => {
        setSelectedTrip(trip)
        setShowModal(true)
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/api')
            .then((response) => {
                setTrips(response.data)
                setFilteredTrips(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    const handlePriceFilter = (event) => {
        const selectedPriceRange = event.target.value
        setPriceFilter(selectedPriceRange)

        let filtered = []

        if (selectedPriceRange === 'all') {
            filtered = trips
        } else if (selectedPriceRange === '0-500') {
            filtered = trips.filter(
                (trip) => trip.price >= 0 && trip.price <= 500
            )
        } else if (selectedPriceRange === '500-1000') {
            filtered = trips.filter(
                (trip) => trip.price >= 500 && trip.price <= 1000
            )
        } else if (selectedPriceRange === '1000+') {
            filtered = trips.filter((trip) => trip.price >= 1000)
        }

        setFilteredTrips(filtered)
    }

    return (
        <div className="trip">
            {
                <>
                    <ToastContainer />
                </>
            }
            <h1>Discover Your Next Adventure</h1>
            <div className="filter">
                <label htmlFor="priceFilter">Filter by Price:</label>
                <select
                    id="priceFilter"
                    value={priceFilter}
                    onChange={handlePriceFilter}
                >
                    <option value="all">All</option>
                    <option value="0-500">$0 - $500</option>
                    <option value="500-1000">$500 - $1000</option>
                    <option value="1000+">$1000+</option>
                </select>
            </div>

            <div className="all-tripcard">
                <div className="triprow">
                    {(priceFilter === 'all' ? trips : filteredTrips).map(
                        (trip) => (
                            <TripData
                                key={trip.id}
                                image={trip.image}
                                heading={trip.heading}
                                price={trip.price}
                                onClick={() => handleTripClick(trip)}
                            />
                        )
                    )}
                </div>
            </div>
            {showModal && (
                <ShowTrip trip={selectedTrip} setShowModal={setShowModal} />
            )}
        </div>
    )
}

export default AllTrips
