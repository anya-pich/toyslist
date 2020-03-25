const mongoose = require('mongoose');
const Profile = require('./Profile');

const ToySchema = new mongoose.Schema({
    title: String,
})