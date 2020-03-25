const db = require('../models');

const index = (req, res) => {
    db.Toy.find({}, (err, allToys) => {
        if (err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        res.json(allToys);
    });
};

// const index = (req, res) => {
//     db.Profile.find({})
//         .populate('toys')
//         .exec((err, toys) => {
//             if(err) {
//                 res.status(500).send(err);
//             }
//             res.json(toys);
//         });
// };

const show = (req, res) => {
    db.Toy.findById(req.params.id, (err, foundToy) => {
        if(err) {
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