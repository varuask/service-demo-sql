const express = require('express');

const router = express.Router();

const { topUsers, days } = require('../controllers/transactions');
const { topUsersValidator } = require('../middlewares/requestValidators');
const cacheHandler = require('../middlewares/cacheHandler');

router.get('/topUsers', topUsersValidator, cacheHandler, topUsers);
router.get('/days', days);

module.exports = router;
