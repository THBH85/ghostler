import React, {useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function Navbar() {

	const { logoutUser } = useContext(AuthContext)
	const navigate = useNavigate()

	function handleLogOutClick () {
		logoutUser()
		navigate('/')
	}

	return (
		<div className="header">	
			<nav>
				<ul>
					<li>
						<Link to="/signup">Signup</Link>
					</li>
					<li>
						<Link to="/login">Login</Link>
					</li>
               	 	<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/projects">Projects</Link>
					</li>
					<li>
						<Link to="/profile">myAccount</Link>
					</li>
					<button  onClick={handleLogOutClick}>Log out</button>
				</ul>
			</nav>
		</div>
	)	
}