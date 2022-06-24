import React from 'react'
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'


export default function HeaderComponent() {
    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div><a href="http://www.in28minutes.com" className="navbar-brand">in28Minutes</a></div>
                <ul className="navbar-nav">
                    {isUserLoggedIn && 
                        <div>
                            <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
                            <li><Link className="nav-link" to="/todos">Todos</Link></li>
                        </div>}
                </ul>
                <ul className="navbar-nav navbar-collapse justify-content-end">
                    {isUserLoggedIn ? 
                        <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li> :
                        <li><Link className="nav-link" to="/login">Login</Link></li>
                        }
                </ul>
            </nav>
        </header>
    )
}
