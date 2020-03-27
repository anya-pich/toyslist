const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile('/public/views/index.html', {
        root: __dirname + '/../',
    });
});

router.post('/cookie', (req, res) => {
    res.cookie('zipcode', req.body.zipcode);
    res.redirect('/');
}); // install cookie

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

router.get('/main', (req, res) => {

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

module.exports = router;

