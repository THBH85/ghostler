import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {

	
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
				</ul>
			</nav>
		</div>
	)	
}