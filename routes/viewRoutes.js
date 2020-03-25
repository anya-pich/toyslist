const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {

    res.sendFile('/public/views/index.html', {
        root: __dirname + '/../',
    });

});

router.get('/login', (req, res) => {

    res.sendFile('/public/views/signup_login/login.html', {
        root: __dirname + '/../',
    });

});

router.get('/signup', (req, res) => {

    res.sendFile('/public/views/signup_login/signup.html', {
        root: __dirname + '/../',
    });

});

module.exports = router;