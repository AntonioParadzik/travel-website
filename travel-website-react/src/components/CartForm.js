import { useNavigate } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import CartItem from './CartItem'
import { getAuth } from 'firebase/auth'
import './CartStyles.css'

const CartForm = () => {
    const navigate = useNavigate()
    const auth = getAuth()
    const user = auth.currentUser
    let userId = null

    if (user) {
        userId = user.uid
    } else {
        console.log('No user is signed in')
    }

    const [cart, setCart] = useState([])

    const handleClickRemove = (itemId) => {
        setCart((prevCart) => {
            return prevCart.filter((item) => item.id !== itemId)
        })
        axios.delete(
            `http://localhost:5000/api/users/${userId}/cart/delete/${itemId}`
        )
    }

    const handleQuantityChange = (itemId, newQuantity) => {
        setCart((prevCart) => {
            return prevCart.map((item) => {
                if (item.id === itemId) {
                    const updatedItem = {
                        ...item,
                        quantity: newQuantity,
                        totalPrice: item.price * newQuantity
                    }

                    axios
                        .put(
                            `http://localhost:5000/api/users/${userId}/update/${itemId}`,
                            updatedItem
                        )
                        .then((response) => console.log(response.data))
                        .catch((error) => console.error('Error:', error))

                    return updatedItem
                } else {
                    return item
                }
            })
        })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/users/${userId}/cart`)
            .then((response) => {
                setCart(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])

    return (
        <div className="cart">
            <div className="cart-items">
                <h1>Your Cart</h1>
                {cart
                    .filter((item) => item.id !== 'placeholder')
                    .map((item) => (
                        <CartItem
                            key={item.id}
                            image={item.image}
                            heading={item.heading}
                            price={item.price}
                            quantity={item.quantity}
                            totalPrice={item.totalPrice}
                            onQuantityChange={(newQuantity) =>
                                handleQuantityChange(item.id, newQuantity)
                            }
                            onClickRemove={() => {
                                handleClickRemove(item.id)
                            }}
                        />
                    ))}
            </div>
            <div className="cart-total">
                <h1>Total</h1>
                <p>€ {cart.reduce((acc, item) => acc + item.totalPrice, 0)}</p>
                <button onClick={() => navigate('/checkout')} type="button">
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default CartForm
