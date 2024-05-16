import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './LoginStyles.css'

import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const { currentUser, login, setError } = useAuth()

    useEffect(() => {
        if (currentUser) {
            navigate('/')
        }
    }, [currentUser, navigate])

    async function handleFormSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/')
        } catch (e) {
            setError('Failed to login')
        }

        setLoading(false)
    }

    return (
        <div className="login-container">
            <div className="login-form">
                <div className="header">
                    <h2 className="title">Login to your account</h2>
                </div>
                <form className="form" onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <div className="input-field">
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                placeholder="Email address"
                                value={email}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="submit-btn">
                        <button type="submit" disabled={loading}>
                            Login
                        </button>
                    </div>
                    <div className="register-link">
                        <div className="text-center">
                            <Link to="/register" className="link">
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
