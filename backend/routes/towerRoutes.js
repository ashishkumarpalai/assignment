const express = require('express');
const {
  createTower,
  getAllTowers,
  getTowerById,
  updateTower,
  deleteTower,
} = require('../controllers/towerController');

const router = express.Router();

router.post('/', createTower);
router.get('/', getAllTowers);
router.get('/:id', getTowerById);
router.put('/:id', updateTower);
router.delete('/:id', deleteTower);

module.exports = router;
