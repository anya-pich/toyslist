const express = require('express');
const router = express.Router();

// homepage
router.get('/', (req, res) => {
    res.sendFile('/public/html/index.html', {
        root: __dirname + '/../',
    });
});

// cart
router.get('/cart', (req, res) => {

    res.sendFile('/public/html/cart.html', {
        root: __dirname + '/../',
    });

});

// profile
router.get('/profile', (req, res) => {
    
    res.sendFile('/public/html/profile.html', {
        root: __dirname + '/../',
    });

});


















// router.get('/login', (req, res) => {

//     res.sendFile('/public/views/signup_login/login.html', {
//         root: __dirname + '/../',
//     });

// });

// router.get('/signup', (req, res) => {

//     res.sendFile('/public/views/signup_login/signup.html', {
//         root: __dirname + '/../',
//     });

// });

// router.get('/main/:id', (req, res) => {

//     res.sendFile('/public/views/indexLoggedin.html', {
//         root: __dirname + '/../',
//     });

// });

// // router.get('/toys/:id', (req, res) => {

// //     res.sendFile('/public/views/cards/toysView.html', {
// //         root: __dirname + '/../',
// //     });

// // });

// router.get('/profile/:id/toy/:id', (req, res) => {

//     res.sendFile('/public/views/cards/toysView.html', {
//         root: __dirname + '/../',
//     });

// });

// router.get('/toysLoggedin/:id/toy/:id', (req, res) => {

//     res.sendFile('/public/views/cards/loggedin/toysViewLoggedin.html', {
//         root: __dirname + '/../',
//     });

// });





// router.get('/profile/:id/edit', (req, res) => {
    
//     res.sendFile('/public/views/profile/profileEdit.html', {
//         root: __dirname + '/../',
//     });

// });

// router.get('/profile/:profileId/toys/new', (req, res) => {

//     res.sendFile('/public/views/cards/toysNew.html', {
//         root: __dirname + '/../',
//     });

// })

// router.get('/profile/:profileId/toy/:toyId/edit', (req, res) => {

//     res.sendFile('/public/views/cards/toysEdit.html', {
//         root: __dirname + '/../',
//     });

// });

module.exports = router;

