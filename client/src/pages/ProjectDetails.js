import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'

export default function ProjectDetails() {

	const { id } = useParams()
	const { user } = useContext(AuthContext)
	let userId = ''
	if (user) userId = user._id

	const [project, setProject] = useState(null)
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		const title = project.title
		const description = project.description
		// get currrent applicants array
		const applicants = project.applicants
		// push current user in this array
		applicants.push(userId)
		const requestBody = { title, description, applicants }
		const storedToken = localStorage.getItem('authToken')
		// put request to the backend to update the project
		axios.put(`/api/projects/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				// redirect to the project list

			})
			.catch(err => console.log(err))
	}


	useEffect(() => {
		const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				setProject(response.data.project)
			})
			.catch(err => console.log(err))
	}, [])

	return (
		<>
			{project === null ? <h3>Loading...</h3> :
				<div className='container-background'>
					<div className='project-details-box'>
						<h3>Title: {project.title}</h3>
						<h5>Description: {project.description}</h5>
						<h5>Category: {project.category}</h5>
						<h5>Deadline: {project.dateString} ({project.timeString})</h5>
						<h5>Compensation: {project.compensation}</h5>
						<div className='project-details-row'>
							{project.applicants.length > 0 ?
								(<h5>Applicants: {
									project.applicants.map(applicant => (
										applicant?.name
									))
								}</h5>)
								: <p></p>}
							{project.applicants.length > 0 && <button className='uni-button' type='text'>Contact Applicant</button>}
						</div>
						<Link to={`/projects/edit/${project._id}`}>
							{project.creator === user._id && <button className='uni-button'>Edit Project</button>}
						</Link>
						<form onSubmit={handleSubmit}>
							{project.creator !== user._id && <button className='uni-button' type='submit'>Apply</button>}
						</form>
					</div>

				</div>
			}
		</>
	)
}



//  project.dateString = project.date.toLocaleDateString('de-DE'), 
//  project.timeString = project.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})