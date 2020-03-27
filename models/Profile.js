const mongoose = require('mongoose');
const Toy = require('./Toy');

//Profile Schema//
const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    zipcode: Number,
    pic: String,
    toys: [Toy.schema]
});

//Profile Model//
const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;