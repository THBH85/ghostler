import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function ProjectDetails() {

	const { id } = useParams()

	const [project, setProject] = useState(null)
	

	useEffect(() => {
		axios.get(`/api/projects/${id}`)
			.then(response => {
				console.log("hello", response.data)
				setProject(response.data.project)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<>
			{project === null ? <h3>Loading...</h3> :
				<>
					<h1>Project Details</h1>
					<h3>Title: {project.title}</h3>
					<h5>Description: {project.description}</h5>
					<h5>Category: {project.category}</h5>
					<h5>Deadline: {project.dateString} ({project.timeString})</h5>
					<h5>Compensation: {project.compensation}</h5>
					<Link to={`/projects/edit/${project._id}`}>
						<button>Edit this Project 📝</button>
					</Link>
				</>
			}
		</>
	)
}

//  project.dateString = project.date.toLocaleDateString('de-DE'), 
//  project.timeString = project.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})