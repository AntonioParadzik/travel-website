import { useState } from 'react'
import './NavbarStyles.css'
import { MenuItems } from './MenuItems'
import { Link, useNavigate } from 'react-router-dom'
import { LogoutIcon } from '@heroicons/react/outline'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
    const [clicked, setClicked] = useState(false)
    const { currentUser, logout, setError } = useAuth()
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
            <h1 className="navbar-logo">Trippy</h1>

            <div className="menu-icons" onClick={handleClick}>
                <i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
            </div>

            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item, index) => (
                    <li key={index}>
                        <Link className={item.cName} to={item.url}>
                            <i className={item.icon}></i>
                            {item.title}
                        </Link>
                    </li>
                ))}
                {!currentUser && (
                    <Link to="/login">
                        <button>Sign Up</button>
                    </Link>
                )}
                {currentUser && (
                    <button onClick={() => handleLogout()}>Logout</button>
                )}
            </ul>
        </nav>
    )
}

export default Navbar
