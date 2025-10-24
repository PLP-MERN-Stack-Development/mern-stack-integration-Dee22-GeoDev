const express = require('express');
const router = express.Router();
const { getAll, create } = require('../controllers/categoryController');
const auth = require('../middleware/auth');


router.get('/', getAll);
router.post('/', auth, create);


module.exports = router;