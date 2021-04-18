const express = require('express');
const slotController = require('../controllers/slotController');

const router = express.Router();

router.get('/create', slotController.slot_create_get);
router.get('/', slotController.slot_index);
router.post('/', slotController.slot_create);
router.get('/:id', slotController.slot_details);
router.delete('/:id', slotController._delete);

module.exports = router;