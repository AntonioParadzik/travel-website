import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

import { useAuth } from '../contexts/AuthContext.js'

export default function Register() {
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [loading, setLoading] = useState(false)

    const { currentUser, register, setError } = useAuth()

    // useEffect(() => {
    //     if (currentUser) {
    //         navigate('/')
    //     }
    // }, [currentUser, navigate])

    async function handleFormSubmit(e) {
        e.preventDefault()

        if (password !== confirmPassword) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await register(email, password)
            navigate('/profile')
        } catch (e) {
            setError('Failed to register')
        }

        setLoading(false)
    }

    return (
        <div className="">
            <div className="">
                <div>
                    <h2 className="">Register your account</h2>
                </div>
                <form className="" onSubmit={handleFormSubmit}>
                    <div className="">
                        <div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className=""
                                placeholder="Your Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                required
                                className=""
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className=""
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                className=""
                                placeholder="Confirm Password"
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="" disabled={loading}>
                            Register
                        </button>
                    </div>
                    <div className="">
                        <div className="">
                            <Link to="/login" className="">
                                Already have an account? Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
