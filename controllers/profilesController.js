const db = require('../models');

const index = (req, res) => {
    res.json({
        name: 'John Doe', 
        location: 'Somewhere Ville', 
        toys: [
            {toy: 'Teddy', price: 5},
            {toy: 'Bear', price: 4},
            {toy: 'Bike', price: 25}
        ]
    });
};

module.exports = {
    index,
};