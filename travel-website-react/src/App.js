import { React, useState } from 'react'
import './App.css'
import Home from './routes/Home'
import About from './routes/About'
import Service from './routes/Service'
import Contact from './routes/Contact'
import { Route, Routes } from 'react-router-dom'
import Login from './routes/Login'
import Register from './routes/Register'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import ErrorMessage from './components/layouts/ErrorMessage'
import WithPrivateRoute from './routes/PrivateRoute'

function App() {
    const [modal, setModal] = useState(false)

    return (
        <AuthProvider>
            <div className="App">
                <ErrorMessage />
                <Routes>
                    <Route path="/" element={<Home setModal={setModal} />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/service" element={<Service />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    {/* <Route
                        path="/profile"
                        element={
                            <WithPrivateRoute>
                                <Profile />
                            </WithPrivateRoute>
                        }
                    /> */}
                </Routes>
            </div>
        </AuthProvider>
    )
}

export default App
