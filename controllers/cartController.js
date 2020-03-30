const db = require('../models');

// get all cart contents for a profile at url/api/v1/profile/profile_id/favs
const index = (req, res) => {
    
    db.Profile.
        findOne({_id: req.params.profile_id}).
        populate('cart').
        exec(function (err, person) {
            if (err) return res.status(400).json({status: 400, error: 'womp, try again'});
            res.json(person.cart);
        });
}; // works

// add an item to the cart for a profile at url/api/v1/profile/profile_id/favs
const add = (req, res) => {

    db.Profile.findById(req.params.profile_id, (err, foundProfile) => {
        
        if (!foundProfile) {return res.status(404).json({status: 404, error: 'not found'})} 
        else if (err) {return res.status(400).json({status: 400, error: 'womp, try again'})}
        
        // add toy reference to profile's cart
        foundProfile.cart.push(req.body.toyId);
        // save profile
        foundProfile.save((err, savedProfile) => {
            if (err) {
                return res
                    .status(400)
                    .json({status: 400, error: 'Something went wrong, please try again.'});
            }
            console.log('saved');
            // respond with saved profile's cart objects
            // let cartObjects = savedProfile.cart.map(toyId => db.Toys.findById(toyId));
            res.json(savedProfile.cart);
        });
    });
}; // works as long as you're sending in this format:
// {
// 	"toyId": "5e80ec67164ad28a25e2d6a1"
// }

// delete an item from the cart for a profile at url/api/v1/profile/profile_id/favs
// router.delete('/profile/:profile_id/favs', ctrl.favsCtrl.remove);
const remove = (req, res) => {
    db.Profile.findById(req.params.profile_id, (err, profile) => {
        if (err) {
            return res
                .status(400)
                .json({status: 400, error: 'Something went wrong, please try again.'});
        }
        profile.cart.pull(req.body.toyId);
        profile.save((err, savedProfile) => {
            if (err) {
                return res
                    .status(400)
                    .json({status: 400, error: 'Something went wrong, please try again.'});
            }
            res.json(savedProfile.cart);
        });
    });
}; // works

module.exports = {
    index,
    add,
    remove,
};