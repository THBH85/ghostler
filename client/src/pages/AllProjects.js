import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProjectCard from '../components/ProjectCard'
import { Link } from 'react-router-dom'


export default function AllProjects() {

	const [projects, setProjects] = useState([])
	const [search, setSearch] = useState('')
	const [isAcademic, setIsAcademic] = useState(false);
	const [ofCategory, setOfCategory] = useState();

	const category = getCategoryOfProjects();

	function getCategoryOfProjects() {
		let category = [];
		projects.forEach(project => {
			if (!category.includes(project.category))
				category.push(project.category);
		})
		return category;
	}

	const handleSearch = event => {
		setSearch(event.target.value);
	}

	const handleIsAcademicChange = event => {
		setIsAcademic(event.target.checked);
	}

	const handleOfCategoryChange = event => {
		setOfCategory(event.target.value);
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
			<div>
				<h1>All Projects</h1>
				<form>
					<input type="text" value={search} onChange={handleSearch} placeholder="Search for specific projects "></input>
					<label htmlFor="isAcademic">Show only academic projects: </label>
					<input type="checkbox" checked={isAcademic} onChange={handleIsAcademicChange}></input>
					<label htmlFor="filterCategories">Filter categories: </label>
					<select onChange={handleOfCategoryChange}>
						<option value="undefined"></option>
						{category
							.map(category => (
								<option value={category} >{category}</option>
							))}
					</select>
				</form>
				{projects
					.filter(project => {
						return project.title.includes(search);
					})
					.filter(project => {
						if (isAcademic && project.academic !== true) {
							return false
						} else {
							return true
						}
					})
					.filter(project => {
						if (ofCategory) {
							return project.category === ofCategory;
						}

						return true;
					})
					.map(project => <ProjectCard key={project._id} {...project} />)}

				<Link to="/projects/add">Add a Project</Link>
			</div>
		</div>
	)
}

// <AddProject getAllProjects={getAllProjects} />