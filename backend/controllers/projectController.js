const {
    createProject,
    getAllProjects,
    getProjectById,
    updateProject,
    deleteProject,
  } = require('../models/projectModel');
  
  // Create Project
  exports.createProject = async (req, res) => {
    try {
      const { developerId, projectDetails, reraStatus, financials, media } = req.body;
  
      if (!developerId || !projectDetails) {
        return res.status(400).json({ error: 'Developer ID and project details are required' });
      }
  
      if (!financials || !media) {
        return res.status(400).json({ error: 'Financials and media are required' });
      }
      const data = {
        developerId,
        projectDetails,
        reraStatus,
        financials,
        media,
      };
  
      const project = await createProject(data);
      res.status(201).json({ id: project.id, message: 'Project created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get All Projects
  exports.getAllProjects = async (req, res) => {
    try {
      const projects = await getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Get Project by ID
  exports.getProjectById = async (req, res) => {
    try {
      const project = await getProjectById(req.params.id);
      res.status(200).json(project);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  
  // Update Project
  exports.updateProject = async (req, res) => {
    try {
      const { projectDetails, reraStatus, financials, media } = req.body;
  
      if (!projectDetails) {
        return res.status(400).json({ error: 'Project details are required' });
      }
  
      const data = {
        projectDetails,
        reraStatus,
        financials,
        media,
      };
  
      await updateProject(req.params.id, data);
      res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // Delete Project
  exports.deleteProject = async (req, res) => {
    try {
      await deleteProject(req.params.id);
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  