const express = require('express');
const router = express.Router();

// arrive at website.com 
// check for cookies

// if no cookies you see all the listings, sign up, login, zipcode & search options

// if cookies, at the same route your profile id will be displayed as a query


// homepage
router.get('/', (req, res) => {
    res.sendFile('/public/views/index.html', {
        root: __dirname + '/../',
    });
});

// set cookie
router.post('/cookie', (req, res) => {
    res.cookie('zipcode', req.body.zipcode);
    res.redirect('/');
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

router.get('/main/:id', (req, res) => {

    res.sendFile('/public/views/indexLoggedin.html', {
        root: __dirname + '/../',
    });

});

// router.get('/toys/:id', (req, res) => {

//     res.sendFile('/public/views/cards/toysView.html', {
//         root: __dirname + '/../',
//     });

// });

router.get('/profile/:id/toy/:id', (req, res) => {

    res.sendFile('/public/views/cards/toysView.html', {
        root: __dirname + '/../',
    });

});

router.get('/toysLoggedin/:id/toy/:id', (req, res) => {

    res.sendFile('/public/views/cards/loggedin/toysViewLoggedin.html', {
        root: __dirname + '/../',
    });

});

router.get('/favorite', (req, res) => {

    res.sendFile('/public/views/favorite/favorite.html', {
        root: __dirname + '/../',
    });

});

router.get('/profile/:id', (req, res) => {
    
    res.sendFile('/public/views/profile/profile.html', {
        root: __dirname + '/../',
    });

});

router.get('/profile/:id/edit', (req, res) => {
    
    res.sendFile('/public/views/profile/profileEdit.html', {
        root: __dirname + '/../',
    });

});

router.get('/profile/:profileId/toys/new', (req, res) => {

    res.sendFile('/public/views/cards/toysNew.html', {
        root: __dirname + '/../',
    });

})

router.get('/profile/:profileId/toy/:toyId/edit', (req, res) => {

    res.sendFile('/public/views/cards/toysEdit.html', {
        root: __dirname + '/../',
    });

});

module.exports = router;

