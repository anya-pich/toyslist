const db = require('../models');

const index = (req, res) => {
    
    db.Toy.find({}, (err, allToys) => {
        if(err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(allToys);
    });

};

const show = (req, res) => {
    db.Toy.findById(req.params.id, (err, foundToy) => {
        if (err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(foundToy);
    });
};

module.exports = {
    index,
    show,
};