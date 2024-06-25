import { useState } from 'react'
import './NavbarStyles.css'
import { MenuItems } from './MenuItems'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
    const [clicked, setClicked] = useState(false)
    const { currentUser, logout } = useAuth()
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleClick = () => {
        setClicked(!clicked)
    }

    async function handleLogout() {
        try {
            setError('')
            await logout()
            navigate('/')
        } catch {
            setError('Failed to logout')
        }
    }

    return (
        <nav className="NavbarItems">
            {error && <div className="error-message">{error}</div>}
            <h1 className="navbar-logo">Voyage</h1>

            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>

            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            className={item.cName}
                            onClick={window.scrollTo(0, 0)}
                            to={item.url}
                        >
                            <i className={item.icon}></i>
                            {item.title}
                        </Link>
                    </li>
                ))}
                {currentUser && (
                    <li>
                        <Link
                            className="nav-links"
                            onClick={window.scrollTo(0, 0)}
                            to="/cart"
                        >
                            <i className="fa-solid fa-cart-shopping"></i>
                            Cart
                        </Link>
                    </li>
                )}
                {!currentUser && (
                    <Link to="/login">
                        <button>Sign Up</button>
                    </Link>
                )}
                {currentUser && (
                    <button onClick={() => handleLogout()}>Logout</button>
                )}
                {!currentUser && (
                    <Link className="nav-links-mobile" to="/login">
                        Sign Up
                    </Link>
                )}
                {currentUser && (
                    <Link
                        className="nav-links-mobile"
                        onClick={() => handleLogout()}
                    >
                        Logout
                    </Link>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
