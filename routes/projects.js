const router = require("express").Router();
const Project = require('../models/Project.model')
const { isAuthenticated } = require('../middleware/jwt')

// get all the projects
router.get('/', (req, res, next) => {
  Project.find()
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => next(err))
});

// create a project
router.post('/', isAuthenticated, (req, res, next) => {
  const { title, description, category, date, compensation } = req.body
  Project.create({ title, description, category, date, compensation })
    .then(project => {
      res.status(201).json(project)
    })
    .catch(err => next(err))
});

// get a specific project
router.get('/:id', isAuthenticated, (req, res, next) => {
  Project.findById(req.params.id)
    .then(project => {
     const projectCopy = JSON.parse(JSON.stringify(project)); 
     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
     projectCopy.dateString = project.date.toLocaleDateString('en-US', options) 
     
     projectCopy.timeString = project.date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      console.log("hello", projectCopy)
      res.status(200).json({project : projectCopy})
    })
    .catch(err => next(err))
});

// update a project
router.put('/:id', isAuthenticated, (req, res, next) => {
  const { title, description } = req.body
  Project.findByIdAndUpdate(req.params.id, {
    title,
    description
  }, { new: true })
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => next(err))
});

// delete a project
router.delete('/:id', isAuthenticated, (req, res, next) => {
  Project.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'project deleted' })
    })
    .catch(err => next(err))
});


module.exports = router;