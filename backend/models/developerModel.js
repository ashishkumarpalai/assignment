const db = require('../config/firebase');

const Developer = db.collection('developers');

// Create Developer
const createDeveloper = async (data) => {
  try {
    const existingDevelopers = await Developer.where('email', '==', data.email).get();
    if (!existingDevelopers.empty) {
      throw new Error('Developer with this email already exists');
    }

    const newDeveloper = await Developer.add(data);
    return newDeveloper;
  } catch (error) {
    throw new Error('Error creating developer: ' + error.message);
  }
};

// Get All Developers
const getAllDevelopers = async () => {
  try {
    const snapshot = await Developer.get();
    if (snapshot.empty) {
      return { message: 'No developers found' };
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw new Error('Error fetching developers: ' + error.message);
  }
};

// Get Developer by ID
const getDeveloperById = async (id) => {
  try {
    const doc = await Developer.doc(id).get();
    if (!doc.exists) throw new Error('Developer not found');
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    throw new Error('Error fetching developer: ' + error.message);
  }
};

// Update Developer
const updateDeveloper = async (id, data) => {
  try {
    const developerRef = Developer.doc(id);
    const doc = await developerRef.get();
    if (!doc.exists) throw new Error('Developer not found');

    const existingDevelopers = await Developer.where('email', '==', data.email).get();
    if (!existingDevelopers.empty && existingDevelopers.docs[0].id !== id) {
      throw new Error('Developer with this email already exists');
    }

    await developerRef.update(data);
    return developerRef;
  } catch (error) {
    throw new Error('Error updating developer: ' + error.message);
  }
};

// Delete Developer
const deleteDeveloper = async (id) => {
  try {
    const doc = await Developer.doc(id).get();
    if (!doc.exists) throw new Error('Developer not found');
    
    await Developer.doc(id).delete();
  } catch (error) {
    throw new Error('Error deleting developer: ' + error.message);
  }
};

module.exports = {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
};
