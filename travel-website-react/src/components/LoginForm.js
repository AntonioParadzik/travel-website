import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

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
        <div className="">
            <div className="">
                <div>
                    <h2 className="">Login to your account</h2>
                </div>
                <form className="" onSubmit={handleFormSubmit}>
                    <div className="">
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className=""
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className=""
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="" disabled={loading}>
                            Login
                        </button>
                    </div>
                    <div className="">
                        <div className="">
                            <Link to="/register" className="">
                                Don't have an account? Register
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
