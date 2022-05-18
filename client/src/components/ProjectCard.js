import React from 'react'
import { Link } from 'react-router-dom'

export default function ProjectCard({ title, category, compensation, _id }) {
	return (
		<div>
			<Link className='link' to={`/projects/${_id}`}>
				<div className='project-card'>
					<p>TITLE: {title}</p>
					<p>CATEGORY: {category}</p>
					<p className='compensation'>COMPENSATION: {compensation}</p>
				</div>
				<hr />
			</Link>
		</div>
	)
}