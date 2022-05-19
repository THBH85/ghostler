import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function EditProject() {

	const { id } = useParams()

	const navigate = useNavigate()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [academic, setAcademic] = useState('')
	const [category, setCategory] = useState('')
	const [date, setDate] = useState('')
	const [compensation, setCompensation] = useState('')
	const [project, setProject] = useState({})

	useEffect(() => {
		console.log('use effect')
		const storedToken = localStorage.getItem('authToken')
		axios.get(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				const { title, description } = response.data
				setTitle(title)
				setDescription(description)
				setProject(response)
			})
			.catch(err => console.log(err))
	}, [])

	const handleSubmit = e => {
		e.preventDefault()
		const applicants = project.applicants
		const requestBody = { title, description, applicants }
		const storedToken = localStorage.getItem('authToken')
		// put request to the backend to update the project
		axios.put(`/api/projects/${id}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				// redirect to the project list
				navigate('/projects')
			})
			.catch(err => console.log(err))
	}

	const deleteProject = () => {
		const storedToken = localStorage.getItem('authToken')
		axios.delete(`/api/projects/${id}`, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(() => {
				// redirect to the projects list
				navigate('/projects')
			})
			.catch(err => console.log(err))
	}

	return (
		<>

			<div className='container-background'>
				<div className='add-project-box'>
					<form onSubmit={handleSubmit}>
						<label className='add-project-label' htmlFor="title">Project Title: </label>
						<input className='add-project-input'
							type="text"
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>

						<label className='add-project-label' htmlFor="description">Description: </label>
						<input className='add-project-input'
							type="text"
							value={description}
							onChange={e => setDescription(e.target.value)}
						/>
						<div className='add-project-row'>
							<label className='add-project-label' htmlFor="academic">Academic</label>
							<input className='add-project-input'
								type="checkbox"
								value={academic}
								onChange={e => setAcademic(e.target.checked)}
							/>

							<label className='add-project-label' htmlFor="category">Category:</label>
							<select
								onChange={e => setCategory(e.target.value)}
								value={category}
							>
								<option value="Course Paper" >Course Paper</option>
								<option value="Bachelor Thesis" >Bachelor Thesis</option>
								<option value="Master Thesis" >Master Thesis</option>
								<option value="Biography" >Biography</option>
								<option value="Autobiography" >Autobiography</option>
								<option value="Novel" >Novel</option>
								<option value="Other" >Other</option>
							</select>
						</div>
						<label className='add-project-label' htmlFor="date">Deadline: </label>
						<input className='add-project-input'
							type="datetime-local"
							value={date}
							onChange={e => setDate(e.target.value)}
						/>

						<label className='add-project-label' htmlFor="compensation">Compensation: </label>
						<input className='add-project-input'
							type="text"
							value={compensation}
							onChange={e => setCompensation(e.target.value)}
						/>
						<div className='edit-project-row'>
						<button className='uni-button' type="submit">Update this project</button>
						<button className='uni-button' onClick={deleteProject}>Delete this project</button>
						</div>
					</form>
					
				</div>
			</div>
		</>
	)
}