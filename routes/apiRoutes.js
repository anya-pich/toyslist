const express = require('express');
const router = express.Router();
const db = require('../models');
const ctrl = require('../controllers');

// PROFILES

// get all user profiles at url/api/v1/profiles
// get all profiles by zipcode at url/api/v1/profiles?zipcode=00000
// get profile id by email address at url/api/v1/profiles?email=bob%40gmail.com
router.get('/profiles', ctrl.profilesCtrl.index);

// create new user profile at url/api/v1/profiles
router.post('/profiles', ctrl.profilesCtrl.create);

// get user profile at url/api/v1/profile/id
router.get('/profile/:id', ctrl.profilesCtrl.show);

// update user profile at url/api/v1/profile/id
router.put('/profile/:id', ctrl.profilesCtrl.update);

// delete user profile at url/api/v1/profile/id
router.delete('/profile/:id', ctrl.profilesCtrl.remove);

// TOYS

// get all toys from a profile at url/api/v1/profile/profile_id/toys
router.get('/profile/:profile_id/toys', ctrl.toysCtrl.index);

// create new toy listing at url/api/v1/profile/profile_id/toys
router.post('/profile/:profile_id/toys', ctrl.toysCtrl.create);

// get specific toy at url/api/v1/profile/profile/toy/toy_id
router.get('/profile/:profile_id/toy/:toy_id', ctrl.toysCtrl.show);

// update specific toy at url/api/v1/profile/profile/toy/toy_id
router.put('/profile/:profile_id/toy/:toy_id', ctrl.toysCtrl.update);

// delete specific toy at url/api/v1/profile/profile/toy/toy_id
router.delete('/profile/:profile_id/toy/:toy_id', ctrl.toysCtrl.remove);

module.exports = router;