import React from 'react'
import { Link } from 'react-router-dom'

const Header = props => {
  return (
    <header>
        <nav>
            <ul>
                <li><Link to='/login'>Login</Link></li>
                <li><Link to='/register'>Register</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
                <li><a onClick={props.logout}>Logout</a></li>
            </ul>
        </nav>
    </header>
  )
}

export default Header
