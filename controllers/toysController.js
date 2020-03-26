const db = require('../models');

// get all toys from a profile at url/api/v1/profile/profile_id/toys

const index = (req, res) => {
    db.Profile.findById(req.params.profile_id, (err, foundProfile) => {
        if (err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(foundProfile.toys);
    });
};

// create new toy listing at url/api/v1/profile/profile_id/toys

const create = (req, res) => {
    // create new toy listing
    db.Toy.create(req.body, (err, newToy) => {
        if (err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        // find profile
        db.Profile.findById(req.params.profile_id, (err, foundProfile) => {
            if (err) {
                return res
                    .status(400)
                    .json({status: 400, error: 'Something went wrong, please try again.'});
            }
            // add toy to profile
            foundProfile.toys.push(newToy);
            // save modified profile
            foundProfile.save((err, savedProfile) => {
                if (err) {
                    return res
                        .status(400)
                        .json({status: 400, error: 'Something went wrong, please try again.'});
                }
                // respond with saved profile ?
                res.json(savedProfile);
            })
        })
    })
};

// get specific toy at url/api/v1/profile/profile/toy/toy_id

const show = (req, res) => {
    db.Profile.findById(req.params.profile_id, (err, foundProfile) => {
        if(err) {
            return res
            .status(400)
            .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        const foundToy = foundCity.toys.id(req.params.toy_id);
        if (!foundToy) {
            res.status(400).json({status: 400, error: 'Could not find item'});
        }
        res.json(foundToy);
    });
};

// update specific toy at url/api/v1/profile/profile/toy/toy_id

const update = (req, res) => {
    // find profile
    db.Profile.findById(req.params.profile_id, (err, foundProfile) => {
        if(err) {
            return res
            .status(400)
            .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        // find toy
        const toyToUpdate = foundProfile.toys.id(req.params.toy_id);
        if (!toyToUpdate) {
            res.status(400).json({status: 400, error: 'Could not find item'});
        }
        // update toy in profile record
        toyToUpdate = req.body;
            //  postToUpdate.title = req.body.title;
            //  postToUpdate.content = req.body.content;
        // save modified profile
        foundProfile.save((err, savedProfile) => {
            if(err) {
                return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
            }
            // Update Post in Post Collection
            // db.Post.findByIdAndUpdate(req.params.postId, req.body, {new: true}, (err, updatedPost) => {
            //     if (err) {
            //     return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
            //     }

            //     res.json(updatedPost);
            res.json(foundProfile.toys.id(req.params.toy_id));
        });
    });
};

// delete specific toy at url/api/v1/profile/profile/toy/toy_id

const remove = (req, res) => {
    // find profile
    db.Profile.findById(req.params.profile_id, (err, foundProfile) => {
        if(err) {
            return res
            .status(400)
            .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        // find toy
        const toyToDelete = foundProfile.toys.id(req.params.toy_id);
        if (!toyToDelete) {
            res.status(400).json({status: 400, error: 'Could not find item'});
        }
        // delete toy
        toyToDelete.remove();
        // save modified profile
        foundProfile.save((err, savedProfile) => {
            if(err) {
                return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
            }
            //         // Delete Post From Post Collection
            //   db.Post.findByIdAndDelete(req.params.postId, (err, deletedPost) => {
            //     if (err) {
            //       return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
            //     }

            //     res.json(updatedPost);
            // res.json(foundProfile.toys.id(req.params.toy_id));
        });
    });
};



module.exports = {
    index,
    create,
    show,
    update,
    remove
};