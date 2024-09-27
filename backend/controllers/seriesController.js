const { createSeries, getSeries, updateSeries, deleteSeries } = require('../models/seriesModel');

// Create Series Controller
exports.createSeries = async (req, res) => {
    try {
        const { seriesName, towerId, seriesTypology, seriesDetails, addOns } = req.body;

        // Validate required fields
        if (!seriesName || !towerId || !seriesTypology) {
            return res.status(400).json({ error: 'Series Name, Tower ID, and Typology are required' });
        }

        const data = { seriesName, towerId, seriesTypology, seriesDetails, addOns };
        const newSeries = await createSeries(data);
        res.status(201).json({ message: 'Series created successfully', series: newSeries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Get Series Controller
exports.getSeries = async (req, res) => {
    try {
        const seriesId = req.params.id;
        const series = await getSeries(seriesId);
        res.status(200).json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Get Series Controller
// exports.getSeries = async (req, res) => {
//     try {
//         const seriesId = req.params.id;
//         const series = await getSeries(seriesId);
//         res.status(200).json(series); // Return the series data directly
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };
// Update Series Controller
exports.updateSeries = async (req, res) => {
    try {
        const seriesId = req.params.id;

        if (!seriesId || typeof seriesId !== 'string') {
            return res.status(400).json({ error: 'Invalid series ID' });
        }

        const { seriesName, towerId, seriesTypology, seriesDetails, addOns } = req.body;

        if (!seriesName || !towerId || !seriesTypology) {
            return res.status(400).json({ error: 'Series Name, Tower ID, and Typology are required' });
        }

        const data = { seriesName, towerId, seriesTypology, seriesDetails, addOns };
        const updatedSeries = await updateSeries(seriesId, data);
        res.status(200).json({ message: 'Series updated successfully', series: updatedSeries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Series Controller
exports.deleteSeries = async (req, res) => {
    try {
        const seriesId = req.params.id;
        const message = await deleteSeries(seriesId);
        res.status(200).json({ message });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
