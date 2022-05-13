import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'
import AddProject from '../components/AddProject'
import { Link } from 'react-router-dom'

export default function AllProjects() {

	const [projects, setProjects] = useState([])

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
		<div className="container-background">
            <div className='container-home-intro'>
			    <h1>All Projects</h1>
			    {projects.map(project => <ProjectCard key={project._id} {...project} />)}
			
                <Link to="/projects/add">Add a Project</Link>
            </div>
		</div>
	)
}

// <AddProject getAllProjects={getAllProjects} />