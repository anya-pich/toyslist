const mongoose = require('mongoose');

const ToySchema = new mongoose.Schema({
    title: String,
    description: String,
    images: Array,
    price: Number,
    ageTag: String,
    genderTag: String
}, {timestamps: true});

const Toy = mongoose.model('Toy', ToySchema);

module.exports = Toy;