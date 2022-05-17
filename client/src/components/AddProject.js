import axios from 'axios'
import React, { useState } from 'react'

export default function AddProject(props) {

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
	const [date, setDate] = useState('')
	const [compensation, setCompensation] = useState('')
	
	
	const handleSubmit = e => {
		e.preventDefault()
		// send the form data to the backend
		const storedToken=localStorage.getItem('authToken')
		axios.post('/api/projects', { title, description, category, date, compensation }, { headers: { Authorization: `Bearer ${storedToken}` } })
			.then(response => {
				console.log(response)
				// reset the form
				setTitle('')
				setDescription('')
                setCategory('')
				setDate('')
				setCompensation('')
				// refresh the list of projects in 'AllProjects'
				props.getAllProjects()
			})
			.catch(err => console.log(err))
	}

	return (
		<>
			<h1>Add a Project</h1>
			<form onSubmit={handleSubmit}>
			
                <label htmlFor="title">Project Title: </label>
				<input
					type="text"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

                <label htmlFor="description">Description: </label>
				<input
					type="text"
					value={description}
					onChange={e => setDescription(e.target.value)}
				/>

                <label htmlFor="category">Project category:</label>
                <select 
					onChange={e => setCategory(e.target.value)}
        			value={category}
				>
                    <option value="Biography" >Biography</option>
					<option value="Autobiography" >Autobiography</option>
                    <option value="Academic" >Academic</option>
                    <option value="Novel" >Novel</option>
					<option value="Other" >Other</option>
                </select>

				<label htmlFor="date">deadline: </label>
				<input 
					type="datetime-local"
					value={date}
					onChange={e => setDate(e.target.value)} 
				/>

				<label htmlFor="compensation">Compensation: </label>
				<input
					type="text"
					value={compensation}
					onChange={e => setCompensation(e.target.value)}
				/>

				<button type="submit">Add this Project ➕</button>
			</form>
		</>
	)
}