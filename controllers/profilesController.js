const db = require('../models');

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

module.exports = {
    index,
    show,
};