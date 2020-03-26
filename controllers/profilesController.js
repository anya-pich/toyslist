const db = require('../models');

// get all user profiles at url/api/v1/profiles

const index = (req, res) => {
    db.Profile.find({}, (err, allProfiles) => {
        if(err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(allProfiles);
    });
};

// create new user profile at url/api/v1/profiles

const create = (req, res) => {
    db.Profile.post(req.body, (err, newProfile) => {
        if(err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.status(201).json(newProfile);
    });
};

// get user profile at url/api/v1/profile/id

const show = (req, res) => {
    db.Profile.findById(req.params.id, (err, foundProfile) => {
        if (err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(foundProfile);
    });
};

// update user profile at url/api/v1/profile/id

const update = (req, res) => {
    db.Profile.findOneAndUpdate(
        {_id: req.params.id},
        req.body,
        {new: true},
        (err, updatedProfile) => {
            if (err) {
                return res
                    .status(400)
                    .json({status: 400, error: 'Something went wrong, please try again.'});
            }
        res.json(updatedProfile);
    });
};

// delete user profile at url/api/v1/profile/id

const remove = (req, res) => {
    db.Profile.deleteOne(
        {_id: req.params.id},
        (err, deletedProfile) => {
            if (err) {
                return res
                    .status(400)
                    .json({status: 400, error: 'Something went wrong, please try again.'});
            }
        res.json(deletedProfile);
        });
};

// get all profiles by zipcode at url/api/v1/profiles?zipcode=00000

const local = (req, res) => {
    db.Profile.find(
        {zipcode: req.query.zipcode},
        (err, zipcodeProfiles) => {
        if(err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(zipcodeProfiles);
    });
};

module.exports = {
    index,
    create,
    show,
    update,
    remove,
    local
};