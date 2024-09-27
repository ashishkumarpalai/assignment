const db = require('../config/firebase');

const Tower = db.collection('towers');

// Create Tower
const createTower = async (data) => {
    try {
        const { projectId, developerId, towerName, towerNumber } = data;

        // Check if the project exists
        const projectDoc = await db.collection('projects').doc(projectId).get();
        if (!projectDoc.exists) {
            throw new Error('Project not found');
        }

        // Check if the developer exists
        const developerDoc = await db.collection('developers').doc(developerId).get();
        if (!developerDoc.exists) {
            throw new Error('Developer not found');
        }

        // Check for duplicate tower
        const duplicateCheck = await Tower.where('towerName', '==', towerName).where('towerNumber', '==', towerNumber).get();
        if (!duplicateCheck.empty) {
            throw new Error('Duplicate tower found. Please changed tower name and tower number');
        }

        const newTower = await Tower.add(data);
        return newTower;
    } catch (error) {
        throw new Error('Error creating tower: ' + error.message);
    }
};

// Get All Towers with Project and Developer Info
const getAllTowers = async () => {
    try {
        const snapshot = await Tower.get();
        if (snapshot.empty) {
            return { message: 'No towers found' };
        }

        const towers = await Promise.all(snapshot.docs.map(async (doc) => {
            const towerData = { id: doc.id, ...doc.data() };

            // Get associated project details
            const projectDoc = await db.collection('projects').doc(towerData.projectId).get();
            if (projectDoc.exists) {
                towerData.project = { id: projectDoc.id, ...projectDoc.data() };
            }

            // Get associated developer details
            const developerDoc = await db.collection('developers').doc(towerData.developerId).get();
            if (developerDoc.exists) {
                towerData.developer = { id: developerDoc.id, ...developerDoc.data() };
            }

            return towerData;
        }));

        return towers;
    } catch (error) {
        throw new Error('Error fetching towers: ' + error.message);
    }
};

// Get Tower by ID
const getTowerById = async (id) => {
    try {
        const doc = await Tower.doc(id).get();
        if (!doc.exists) throw new Error('Tower not found');

        const towerData = { id: doc.id, ...doc.data() };

        // Get associated project details
        const projectDoc = await db.collection('projects').doc(towerData.projectId).get();
        if (projectDoc.exists) {
            towerData.project = { id: projectDoc.id, ...projectDoc.data() };
        }

        // Get associated developer details
        const developerDoc = await db.collection('developers').doc(towerData.developerId).get();
        if (developerDoc.exists) {
            towerData.developer = { id: developerDoc.id, ...developerDoc.data() };
        }

        return towerData;
    } catch (error) {
        throw new Error('Error fetching tower: ' + error.message);
    }
};

// Update Tower
const updateTower = async (id, data) => {
    try {
        const towerRef = Tower.doc(id);
        const doc = await towerRef.get();

        // Check if the tower exists
        if (!doc.exists) {
            throw new Error('Tower not found');
        }

        const { projectId, developerId } = data;

        // Validate project ID
        const projectDoc = await db.collection('projects').doc(projectId).get();
        if (!projectDoc.exists) {
            throw new Error('Invalid project ID');
        }

        // Validate developer ID
        const developerDoc = await db.collection('developers').doc(developerId).get();
        if (!developerDoc.exists) {
            throw new Error('Invalid developer ID');
        }

        // Update the tower
        await towerRef.update(data);

        // Return the updated tower data
        const updatedTower = await towerRef.get();
        return { id: updatedTower.id, ...updatedTower.data() };
    } catch (error) {
        throw new Error('Error updating tower: ' + error.message);
    }
};


// Delete Tower
const deleteTower = async (id) => {
    try {
        const doc = await Tower.doc(id).get();
        if (!doc.exists) throw new Error('Tower not found');

        await Tower.doc(id).delete();
    } catch (error) {
        throw new Error('Error deleting tower: ' + error.message);
    }
};

module.exports = {
    createTower,
    getAllTowers,
    getTowerById,
    updateTower,
    deleteTower,
};













// const db = require('../config/firebase');

// const Tower = db.collection('towers');

// // Create Tower
// const createTower = async (data) => {
//   try {
//     const { projectId, developerId } = data;

//     // Check if the project exists
//     const projectDoc = await db.collection('projects').doc(projectId).get();
//     if (!projectDoc.exists) {
//       throw new Error('Project not found');
//     }

//     // Check if the developer exists
//     const developerDoc = await db.collection('developers').doc(developerId).get();
//     if (!developerDoc.exists) {
//       throw new Error('Developer not found');
//     }

//     const newTower = await Tower.add(data);
//     return newTower;
//   } catch (error) {
//     throw new Error('Error creating tower: ' + error.message);
//   }
// };

// // Get All Towers
// const getAllTowers = async () => {
//   try {
//     const snapshot = await Tower.get();
//     if (snapshot.empty) {
//       return { message: 'No towers found' };
//     }
//     return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     throw new Error('Error fetching towers: ' + error.message);
//   }
// };

// // Get Tower by ID
// const getTowerById = async (id) => {
//   try {
//     const doc = await Tower.doc(id).get();
//     if (!doc.exists) throw new Error('Tower not found');
//     return { id: doc.id, ...doc.data() };
//   } catch (error) {
//     throw new Error('Error fetching tower: ' + error.message);
//   }
// };

// // Update Tower
// const updateTower = async (id, data) => {
//   try {
//     const towerRef = Tower.doc(id);
//     const doc = await towerRef.get();
//     if (!doc.exists) throw new Error('Tower not found');

//     await towerRef.update(data);
//     return towerRef;
//   } catch (error) {
//     throw new Error('Error updating tower: ' + error.message);
//   }
// };

// // Delete Tower
// const deleteTower = async (id) => {
//   try {
//     const doc = await Tower.doc(id).get();
//     if (!doc.exists) throw new Error('Tower not found');

//     await Tower.doc(id).delete();
//   } catch (error) {
//     throw new Error('Error deleting tower: ' + error.message);
//   }
// };

// module.exports = {
//   createTower,
//   getAllTowers,
//   getTowerById,
//   updateTower,
//   deleteTower,
// };
