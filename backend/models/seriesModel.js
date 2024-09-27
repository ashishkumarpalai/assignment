const db = require('../config/firebase');
const Series = db.collection('series');
const Tower = db.collection('towers');

// Create a new series
const createSeries = async (data) => {
    try {
        const towerDoc = await Tower.doc(data.towerId).get();
        if (!towerDoc.exists) {
            throw new Error('Invalid Tower ID');
        }
        const newSeries = await Series.add(data);
        const createdSeries = await newSeries.get();
        return { id: createdSeries.id, ...createdSeries.data() };
    } catch (error) {
        throw new Error('Error creating series: ' + error.message);
    }
};

// Get all series or specific series by ID
const getSeries = async (id) => {
    try {
        if (id) {
            const seriesDoc = await Series.doc(id).get();
            if (!seriesDoc.exists) {
                throw new Error('Series not found');
            }
            return { id: seriesDoc.id, ...seriesDoc.data() };
        } else {
            const seriesSnapshot = await Series.get();
            const seriesList = seriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return seriesList.length ? seriesList : 'No series available';
        }
    } catch (error) {
        throw new Error('Error fetching series: ' + error.message);
    }
};

// Update an existing series
const updateSeries = async (id, data) => {
    try {
        const seriesRef = Series.doc(id);
        const seriesDoc = await seriesRef.get();

        if (!seriesDoc.exists) {
            throw new Error('Series not found');
        }

        // Validate the towerId before updating
        const towerDoc = await Tower.doc(data.towerId).get();
        if (!towerDoc.exists) {
            throw new Error('Invalid Tower ID');
        }

        await seriesRef.update(data);
        const updatedSeries = await seriesRef.get();
        return { id: updatedSeries.id, ...updatedSeries.data() };
    } catch (error) {
        throw new Error('Error updating series: ' + error.message);
    }
};

// Delete a series by ID
const deleteSeries = async (id) => {
    try {
        const seriesRef = Series.doc(id);
        const seriesDoc = await seriesRef.get();

        if (!seriesDoc.exists) {
            throw new Error('Series not found');
        }

        await seriesRef.delete();
        return 'Series deleted successfully';
    } catch (error) {
        throw new Error('Error deleting series: ' + error.message);
    }
};

module.exports = {
    createSeries,
    getSeries,
    updateSeries,
    deleteSeries
};
