const express = require('express');
const router = express.Router();
const db = require('../models');
const ctrl = require('../controllers');

router.get('/toys', ctrl.toysCtrl.index);

module.exports = router;