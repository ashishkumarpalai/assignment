const db = require('../config/firebase');

const Project = db.collection('projects');

// Create Project
const createProject = async (data) => {
  try {
    const { developerId } = data; // Assume developerId is passed in the data

    // Check if the developer exists
    const developerDoc = await db.collection('developers').doc(developerId).get();
    if (!developerDoc.exists) {
      throw new Error('Developer not found');
    }

    // Check if the project already exists
    const existingProject = await Project.where('developerId', '==', developerId).get();
    if (!existingProject.empty) {
      throw new Error('Project already exists for this developer');
    }

    // Add the project to the database  
    const newProject = await Project.add(data);
    return newProject;
  } catch (error) {
    throw new Error('Error creating project: ' + error.message);
  }
};

// Get All Projects
const getAllProjects = async () => {
  try {
    const snapshot = await Project.get();
    if (snapshot.empty) {
      return { message: 'No projects found' };
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error('Error fetching projects: ' + error.message);
  }
};

// Get Project by ID
const getProjectById = async (id) => {
  try {
    const doc = await Project.doc(id).get();
    if (!doc.exists) throw new Error('Project not found');
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw new Error('Error fetching project: ' + error.message);
  }
};

// Update Project
const updateProject = async (id, data) => {
  try {
    const projectRef = Project.doc(id);
    const doc = await projectRef.get();
    if (!doc.exists) throw new Error('Project not found');

    await projectRef.update(data);
    return projectRef;
  } catch (error) {
    throw new Error('Error updating project: ' + error.message);
  }
};

// Delete Project
const deleteProject = async (id) => {
  try {
    const doc = await Project.doc(id).get();
    if (!doc.exists) throw new Error('Project not found');
    
    await Project.doc(id).delete();
  } catch (error) {
    throw new Error('Error deleting project: ' + error.message);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
