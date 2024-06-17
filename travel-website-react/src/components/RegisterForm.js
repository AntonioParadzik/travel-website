import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import './RegisterStyles.css'

import { useAuth } from '../contexts/AuthContext.js'

export default function Register() {
    const navigate = useNavigate()

    const [userName, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const { currentUser, register } = useAuth()

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, navigate])

    async function handleFormSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            return setError('Error: Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            const userCredential = await register(email, password)
            const userData = {
                uid: userCredential.user.uid,
                email: userCredential.user.email,
                username: userName
            }
            await axios.post('http://localhost:5000/api/newUser', userData)
        } catch (e) {
            setError('Error: Failed to register')
        }

        setLoading(false)
    }

    return (
        <div className="register-container">
            {error && <div className="error-message">{error}</div>}
            <div className="register-form">
                <div className="back-to-home">
                    <Link to="/" className="link">
                        ← Back to Home
                    </Link>
                </div>
                <div className="header">
                    <h2 className="title">Register your account</h2>
                </div>

                <form className="form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <div className="input-field">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="submit-btn">
                        <button type="submit" disabled={loading}>
                            Register
                        </button>
                    </div>
                    <div className="login-link">
                        <div className="text-center">
                            <Link to="/login" className="link">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
