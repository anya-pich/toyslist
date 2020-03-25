const mongoose = require('mongoose');

//Toy Schema//
const ToySchema = new mongoose.Schema({
    title: String,
    description: String,
    images: Array,
    price: Number,
    ageTag: String,
    genderTag: String
}, {timestamps: true});

//Toy Model//
const Toy = mongoose.model('Toy', ToySchema);

module.exports = Toy;