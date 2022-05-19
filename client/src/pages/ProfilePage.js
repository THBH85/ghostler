import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth'




export default function ProfilePage() {

	const { logoutUser } = useContext(AuthContext)
	const navigate = useNavigate()

	function handleLogOutClick () {
		logoutUser()
		navigate('/')
	}

	const [projects, setProjects] = useState([])
	const [isProjectCreator, setIsProjectCreator] = useState(false);
	const [isProjectApplicant, setIsProjectApplicant] = useState(false);

    const {user} = useContext(AuthContext)

	const handleProjectCreatorChange = event => {
		setIsProjectCreator(event.target.checked);
	}

	const handleProjectApplicantChange = event => {
		setIsProjectApplicant(event.target.checked);
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
				<h1>Hello {user?.name}</h1>
				<div >
				<form className="filter-row">
					
					<label htmlFor="isProjectCreator">Show projects I created</label>
					<input type="checkbox" checked={isProjectCreator} onChange={handleProjectCreatorChange}></input>
					<label htmlFor="isProjectApplicant">Show projects I applied for</label>
					<input type="checkbox" checked={isProjectApplicant} onChange={handleProjectApplicantChange}></input>
					<Link to="/projects/add">
					<button className="add-project-button" type="text">Add project</button>
					</Link>
					<button className="log-out-button"  onClick={handleLogOutClick}>Log out</button>
				</form>
				</div>
				{projects
					
					.filter(project => {
						if (isProjectCreator) {
							return project.creator === user._id 
						}
						return true
						
					})

					.filter(project => {
						if (isProjectApplicant) {
							return project.applicants[0] === user.id 

							
						}
						
						return true
						
					})
					
					.map(project => <ProjectCard key={project._id} {...project} />)}

				
			</div>
		</div>
	)
}