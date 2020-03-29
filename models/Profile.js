const mongoose = require('mongoose');
const Toy = require('./Toy');
const ToySchema = require('./Toy')

//Profile Schema//
const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    zipcode: Number,
    pic: String,
    toys: [Toy.schema],
    cart: [{
        type: mongoose.ObjectId,
        ref: 'Toy'
    }]
});

//Profile Model//
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;