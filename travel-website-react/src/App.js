import { React, useState } from 'react'
import './App.css'
import Home from './routes/Home'
import About from './routes/About'
import Contact from './routes/Contact'
import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Register from './routes/Register'
import { AuthProvider } from './contexts/AuthContext'
import WithPrivateRoute from './routes/PrivateRoute'
import Trips from './routes/Trips'
import Cart from './routes/Cart'
import Checkout from './routes/Checkout'
function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/trips" element={<Trips />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {
                        <Route
                            path="/cart"
                            element={
                                <WithPrivateRoute>
                                    <Cart />
                                </WithPrivateRoute>
                            }
                        />
                    }
                    {
                        <Route
                            path="/checkout"
                            element={
                                <WithPrivateRoute>
                                    <Checkout />
                                </WithPrivateRoute>
                            }
                        />
                    }
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
