const express = require('express');
const {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
} = require('../controllers/developerController');

const router = express.Router();

router.post('/', createDeveloper);
router.get('/', getAllDevelopers);
router.get('/:id', getDeveloperById);
router.put('/:id', updateDeveloper);
router.delete('/:id', deleteDeveloper);

module.exports = router;
