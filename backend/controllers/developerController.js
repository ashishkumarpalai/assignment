const {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
} = require('../models/developerModel');

// Create Developer
exports.createDeveloper = async (req, res) => {
  try {
    const { developerName, email, address, incorporationDate, totalProjectsDelivered, totalSqFtDelivered, reasonForChoosingDeveloper, websiteLink } = req.body;

    if (!developerName || !email) {
      return res.status(400).json({ error: 'Developer name and email are required' });
    }
    if(!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    if(!incorporationDate) { 
      return res.status(400).json({ error: 'Incorporation date is required' });
    }
    if(!totalProjectsDelivered) {
      return res.status(400).json({ error: 'Total projects delivered is required' });
    }
    if(!totalSqFtDelivered) {
      return res.status(400).json({ error: 'Total square feet delivered is required' });
    }
    if(!reasonForChoosingDeveloper) {
      return res.status(400).json({ error: 'Reason for choosing developer is required' });
    }
    if(!websiteLink) {
      return res.status(400).json({ error: 'Website link is required' });
    }

    const data = {
      developerName,
      email,
      address,
      incorporationDate,
      totalProjectsDelivered,
      totalSqFtDelivered,
      reasonForChoosingDeveloper,
      websiteLink,
    };

    const developer = await createDeveloper(data);
    res.status(201).json({ id: developer.id, message: 'Developer created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Developers
exports.getAllDevelopers = async (req, res) => {
  try {
    const developers = await getAllDevelopers();
    res.status(200).json(developers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Developer by ID
exports.getDeveloperById = async (req, res) => {
  try {
    const developer = await getDeveloperById(req.params.id);
    res.status(200).json(developer);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Update Developer
exports.updateDeveloper = async (req, res) => {
  try {
    const { developerName, email, address, incorporationDate, totalProjectsDelivered, totalSqFtDelivered, reasonForChoosingDeveloper, websiteLink } = req.body;

    if (!developerName || !email) {
      return res.status(400).json({ error: 'Developer name and email are required' });
    }
    if(!address) {
      return res.status(400).json({ error: 'Address is required' });
    }
    if(!incorporationDate) { 
      return res.status(400).json({ error: 'Incorporation date is required' });
    }
    if(!totalProjectsDelivered) {
      return res.status(400).json({ error: 'Total projects delivered is required' });
    }
    if(!totalSqFtDelivered) {
      return res.status(400).json({ error: 'Total square feet delivered is required' });
    }
    if(!reasonForChoosingDeveloper) {
      return res.status(400).json({ error: 'Reason for choosing developer is required' });
    }
    if(!websiteLink) {
      return res.status(400).json({ error: 'Website link is required' });
    }
    
    const data = {
      developerName,
      email,
      address,
      incorporationDate,
      totalProjectsDelivered,
      totalSqFtDelivered,
      reasonForChoosingDeveloper,
      websiteLink,
    };

    await updateDeveloper(req.params.id, data);
    res.status(200).json({ message: 'Developer updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Developer
exports.deleteDeveloper = async (req, res) => {
  try {
    await deleteDeveloper(req.params.id);
    res.status(200).json({ message: 'Developer deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
