const express = require('express');
const router = express.Router();
const db = require('../models');
const ctrl = require('../controllers');

// get all toys at url/api/v1/toys
router.get('/toys', ctrl.toysCtrl.index);

// get specific toy at url/api/v1/toy/id
router.get('/toy/:id', ctrl.toysCtrl.show);

// get all toys at specific zipcode at url/api/v1/toys?zipcode=00000
// router.get('/toys', ctrl.toysCtrl.)


// router.get('/toys', ctrl.toysCtrl.index);

// router.get('/toys/:id', ctrl.toysCtrl.show);

// get all user profiles at url/api/v1/profiles
router.get('/profiles', ctrl.profilesCtrl.index);

// get user profile at url/api/v1/profile/id
router.get('/profile/:id', ctrl.profilesCtrl.show);

module.exports = router;