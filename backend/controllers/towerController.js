const {
    createTower,
    getAllTowers,
    getTowerById,
    updateTower,
    deleteTower,
} = require('../models/towerModel');

// Create Tower
exports.createTower = async (req, res) => {
    try {
        const {
            projectId,
            developerId,
            towerNumber,
            towerName,
            towerPhase,
            phaseReraNumber,
            deliveryTimeline,
            currentStatus,
            duplicateTowerOption,
            totalFloors,
            towerCoreDetails,
        } = req.body;

        if (!projectId || !developerId || !towerNumber || !towerName) {
            return res.status(400).json({ error: 'Project ID, Developer ID, Tower Number, and Tower Name are required' });
        }

        const data = {
            projectId,
            developerId,
            towerNumber,
            towerName,
            towerPhase,
            phaseReraNumber,
            deliveryTimeline,
            currentStatus,
            duplicateTowerOption,
            totalFloors,
            towerCoreDetails,
        };

        const tower = await createTower(data);
        res.status(201).json({ id: tower.id, message: 'Tower created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get All Towers
exports.getAllTowers = async (req, res) => {
    try {
        const towers = await getAllTowers();
        res.status(200).json(towers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Tower by ID
exports.getTowerById = async (req, res) => {
    try {
        const tower = await getTowerById(req.params.id);
        res.status(200).json(tower);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Update Tower
exports.updateTower = async (req, res) => {
    try {
        const updatedTower = req.body;
        await updateTower(req.params.id, updatedTower);
        res.status(200).json({ message: 'Tower updated successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Delete Tower
exports.deleteTower = async (req, res) => {
    try {
        await deleteTower(req.params.id);
        res.status(200).json({ message: 'Tower deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};


