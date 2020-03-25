const mongoose = require('mongoose');
const Toy = require('./Toy');

const ProfileSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    zipcode: Number,
    toys: [Toy.schema]
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;