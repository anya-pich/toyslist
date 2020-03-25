// ------------------------------------- SERVER CONFIG -------------------------------------- //

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 4000;

// ---------------------------------------- DATABASE ---------------------------------------- //

const db = require('./models');

// ---------------------------------------- ROUTES ---------------------------------------- //

const routes = require('./routes');

// --------------------------------------- MIDDLEWARE --------------------------------------- //

// Serve Public Directory
app.use(express.static(`${__dirname}/public`));

// BodyParser - Make Request Data Avaialble on req.body
app.use(bodyParser.json());

// Get url encoded queries & params
app.use(bodyParser.urlencoded({ extended: false})); // maybe

// -------------------------------------- HTML ROUTES --------------------------------------- //

app.use('/', routes.views);

app.get('/test', (req, res) => {
    res.send('right back at you');
});

// -------------------------------------- API ROUTES ---------------------------------------- //

app.use('/api/v1/', routes.api);

// -------------------------------------- START SERVER -------------------------------------- //

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
