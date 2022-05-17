import axios from 'axios'
import React, { useState } from 'react'

export default function AddProject(props) {

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [academic, setAcademic] = useState('')
	const [category, setCategory] = useState('')
	const [date, setDate] = useState('')
	const [compensation, setCompensation] = useState('')



	const handleSubmit = e => {
		e.preventDefault()
		// send the form data to the backend
		const storedToken = localStorage.getItem('authToken')
		axios.post('/api/projects', { title, description, academic, category, date, compensation }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log(response)
				// reset the form
				setTitle('')
				setDescription('')
				setAcademic('')
				setCategory('')
				setDate('')
				setCompensation('')

				// refresh the list of projects in 'AllProjects'
				props.getAllProjects()
			})
			.catch(err => console.log(err))
	}

	return (
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

					<label className='add-project-label' htmlFor="academic">Academic</label>
					<input className='add-project-input'
						type="checkbox"
						value={academic}
						onChange={e => setAcademic(e.target.checked)}
					/>

					<label className='add-project-label' htmlFor="category">Project category:</label>
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

					<label className='add-project-label' htmlFor="date">deadline: </label>
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

					<button type="submit">Add this Project ➕</button>
				</form>
			</div>
		</div>
	)
}