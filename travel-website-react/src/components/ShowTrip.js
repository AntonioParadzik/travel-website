import { React, useState } from 'react'
import './ShowTripStyles.css'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ShowTrip({ trip, setShowModal }) {
    const auth = getAuth()
    const user = auth.currentUser
    let userId = null

    if (user) {
        userId = user.uid
    } else {
        console.log('No user is signed in')
    }
    async function handleAddToCart() {
        try {
            if (userId === null) {
                console.log('No user is signed in')
                toast.error('You need to be signed in to add trips to cart')
                setShowModal(false)
            } else {
                const response = await axios.get(
                    `http://localhost:5000/api/users/${userId}/cart`
                )
                const cartItems = response.data

                const cartItem = cartItems.find(
                    (item) => item.heading === trip.heading
                )

                if (cartItem) {
                    if (cartItem.quantity < 5) {
                        await axios.put(
                            `http://localhost:5000/api/users/${userId}/update/${cartItem.id}`,
                            {
                                quantity: parseInt(cartItem.quantity) + 1,
                                totalPrice:
                                    trip.price *
                                    (parseInt(cartItem.quantity) + 1)
                            }
                        )
                        console.log('Item quantity updated')
                        toast.success('Item quantity updated')
                    } else {
                        console.log(
                            'Cannot add more of this item. Limit reached.'
                        )
                        toast.error(
                            'Cannot add more of this item. Limit reached.'
                        )
                    }
                } else {
                    const cartData = {
                        userId,
                        heading: trip.heading,
                        price: trip.price,
                        image: trip.image,
                        quantity: parseInt(1),
                        totalPrice: trip.price * 1
                    }
                    await axios.post(
                        `http://localhost:5000/api/users/${userId}/newCartItem`,
                        cartData
                    )
                    console.log('Item added to cart successfully')
                    toast.success('Item added to cart successfully')
                }

                setShowModal(false)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const stopPropagation = (e) => {
        e.stopPropagation()
    }

    const boldedLocation1 = trip.location1.replace(/^(.*?):/, '<b>$1</b>:')
    const boldedLocation2 = trip.location2.replace(/^(.*?):/, '<b>$1</b>:')
    const boldedLocation3 = trip.location3.replace(/^(.*?):/, '<b>$1</b>:')

    return (
        <div className="modal" onClick={() => setShowModal(false)}>
            <div className="modal-card" onClick={stopPropagation}>
                <button onClick={() => setShowModal(false)}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h2>{trip.heading}</h2>
                <div className="modal-content">
                    <img src={trip.image} alt={trip.heading} />
                    <div className="modal-text">
                        <p>{trip.text}</p>
                        <ul>
                            <li
                                dangerouslySetInnerHTML={{
                                    __html: boldedLocation1
                                }}
                            ></li>
                            <li
                                dangerouslySetInnerHTML={{
                                    __html: boldedLocation2
                                }}
                            ></li>
                            <li
                                dangerouslySetInnerHTML={{
                                    __html: boldedLocation3
                                }}
                            ></li>
                        </ul>
                    </div>
                </div>
                <div className="modal-cart">
                    <p className="price">€ {trip.price} per person</p>
                    <button onClick={handleAddToCart}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ShowTrip
