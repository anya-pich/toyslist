const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    // res.sendFile('views/index.html', {
    //     root: __dirname + '/../',
    // });

    res.send('home page goes here');

});

module.exports = router;