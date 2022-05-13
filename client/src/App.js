import './App.css';
import React from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import AllProjects from './pages/AllProjects'
import ProjectDetails from './pages/ProjectDetails'
//import EditProject from './pages/EditProject'
import Navbar from './components/Navbar';
import AddProject from './components/AddProject';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/projects' element={<AllProjects />} />
        <Route path='/projects/:id' element={<ProjectDetails />} />
        <Route path='/projects/add' element={<AddProject />} />
      </Routes>
    </div>
  );
}

export default App;
