import React, { useRef, useState } from 'react'
import './CheckoutStyles.css'
import axios from 'axios'
import { getAuth } from 'firebase/auth'

const CheckoutForm = () => {
    const auth = getAuth()
    const user = auth.currentUser
    let userId = null

    if (user) {
        userId = user.uid
    } else {
        console.log('No user is signed in')
    }
    const [showConfirmation, setShowConfirmation] = useState(false)

    const cardNumberRef = useRef(null)
    const expiryRef = useRef(null)
    const cvvRef = useRef(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        let isValid = true

        const cardNumber = cardNumberRef.current.value.trim()
        const expiry = expiryRef.current.value.trim()
        const cvv = cvvRef.current.value.trim()

        const cardNumberRegex = /^\d{16}$/
        if (!cardNumberRegex.test(cardNumber)) {
            cardNumberRef.current.setCustomValidity(
                'Invalid card number, must be 16 digits'
            )
            isValid = false
        }

        // Validate expiry date (MM/YY)
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
        if (!expiryRegex.test(expiry)) {
            expiryRef.current.setCustomValidity(
                'Expiry date must be in MM/YY format'
            )
            isValid = false
        }
        // Validate CVV (exactly 3 digits)
        const cvvRegex = /^\d{3}$/
        if (!cvvRegex.test(cvv)) {
            cvvRef.current.setCustomValidity('CVV must be exactly 3 digits')
            isValid = false
        }

        if (isValid) {
            setShowConfirmation(true)
        } else {
            event.target.reportValidity()
        }

        axios.delete(`http://localhost:5000/api/users/${userId}/cart/deleteAll`)
    }

    return (
        <div className="checkout">
            <div className="checkout-container">
                <h1>Checkout</h1>
                {!showConfirmation ? (
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className="form-section">
                            <h2>Billing Information</h2>
                            <label htmlFor="name">Full Name</label>
                            <input type="text" id="name" name="name" required />

                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                            />

                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                            />

                            <label htmlFor="city">City</label>
                            <input type="text" id="city" name="city" required />

                            <label htmlFor="state">State</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                required
                            />

                            <label htmlFor="zip">Zip Code</label>
                            <input type="text" id="zip" name="zip" required />
                        </div>

                        <div className="form-section">
                            <h2>Payment Information</h2>
                            <label htmlFor="card-name">Name on Card</label>
                            <input
                                type="text"
                                id="card-name"
                                name="card-name"
                                required
                            />

                            <label htmlFor="card-number">Card Number</label>
                            <input
                                type="text"
                                id="card-number"
                                name="card-number"
                                ref={cardNumberRef}
                                onChange={() =>
                                    cardNumberRef.current.setCustomValidity('')
                                }
                                required
                            />

                            <label htmlFor="expiry">Expiry Date</label>
                            <input
                                type="text"
                                id="expiry"
                                name="expiry"
                                placeholder="MM/YY"
                                ref={expiryRef}
                                onChange={() =>
                                    expiryRef.current.setCustomValidity('')
                                }
                                required
                            />

                            <label htmlFor="cvv">CVV</label>
                            <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                ref={cvvRef}
                                onChange={() =>
                                    cvvRef.current.setCustomValidity('')
                                }
                                required
                            />
                        </div>

                        <button type="submit">Complete Checkout</button>
                    </form>
                ) : (
                    <div id="confirmation">
                        <h2>Thank you for your order!</h2>
                        <p>
                            Your order has been received and is being processed.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutForm
