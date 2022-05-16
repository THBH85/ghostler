import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ title, description, _id }) {
	return (
		<div>
			<Link className='link' to={`/projects/${_id}`}>
            <div className='container-home-intro'>
				<h3>Project title: {title}</h3>
                <p>Project description: {description}</p>

				
                </div>
			</Link>
		</div>
	)
}