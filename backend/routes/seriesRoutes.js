const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');

// Create a new series
router.post('/', seriesController.createSeries);

// Get all series or a specific series by ID
router.get('/:id?', seriesController.getSeries);

// Update a series by ID
router.put('/:id', seriesController.updateSeries);

// Delete a series by ID
router.delete('/:id', seriesController.deleteSeries);

module.exports = router;
