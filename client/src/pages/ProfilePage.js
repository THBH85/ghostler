import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'




export default function ProfilePage() {

	const [projects, setProjects] = useState([])
	const [isProjectCreator, setIsProjectCreator] = useState(false);

    const {user} = useContext(AuthContext)

	const handleProjectCreatorChange = event => {
		setIsProjectCreator(event.target.checked);
	}



	const getAllProjects = () => {
		axios.get('/api/projects')
			.then(response => {
				console.log(response)
				setProjects(response.data)
			})
			.catch(err => console.log(err))
	}

	useEffect(() => {
		// get all the projects from the server
		getAllProjects()
	}, [])

	return (
		<div>
			<div className='all-projects-container'>
				<h1>Hello {user.name}</h1>
				<div >
				<form className="filter-row">
					
					<label htmlFor="isProjectCreator">Show all projects I created</label>
					<input type="checkbox" checked={isProjectCreator} onChange={handleProjectCreatorChange}></input>
					<Link to="/projects/add">
					<button className="add-project-button" type="text">Add project</button>
					</Link>
				</form>
				</div>
				{projects
					
					.filter(project => {
						if (isProjectCreator) {
							return project.creator === user._id 
						}
						return true
						
					})
					
					.map(project => <ProjectCard key={project._id} {...project} />)}

				
			</div>
		</div>
	)
}