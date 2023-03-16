const express = require('express');
const router = express.Router();
// ---------------------------------------------

// Path to handle Static Files with in the router
// ---------------------------------------------
router.use(express.static('public'));

// Create xboxRoutes Server will break until xboxRoutes is created
// ---------------------------------------------
const xboxRoutes = require('./api/xboxRoutes');

// Create path that will point to psGameRoutes
// ---------------------------------------------
router.use('/xboxGames', xboxRoutes);

// Create Home Route
// ---------------------------------------------
router.get('/', (req, res)=> {
    res.render('pages/home', {
        title: 'My Xbox API Website',
        name: 'My Xbox API Website'
    })
});

// All Xbox Games
// ------------------------------------------------------
router.get('/games', async (req, res) => {
    const response = await fetch('https://api.sampleapis.com/xbox/games');
    const data = await response.json();
    res.render('pages/games',
    { games: data });
});
// ------------------------------------------------------

// All Xbox Games Genre
// ------------------------------------------------------
router.get('/genre', async (req, res) => {
    const response = await fetch('https://api.sampleapis.com/xbox/games');
    const data = await response.json();
    res.render('pages/genre',
    { games: data });
});
// ------------------------------------------------------

// All Xbox Games Developers
// ------------------------------------------------------
router.get('/developers', async (req, res) => {
    const response = await fetch(`https://api.sampleapis.com/xbox/games`);
    const data = await response.json();
    res.render('pages/developers',
    { games: data });
});
// ------------------------------------------------------

// All Xbox Game Publishers
// ------------------------------------------------------
router.get('/publishers', async (req, res) => {
    const response = await fetch(`https://api.sampleapis.com/xbox/games`);
    const data = await response.json();
    res.render('pages/publishers',
    { games: data });
});
// ------------------------------------------------------


// Create Error Page
// ---------------------------------------------
router.get('/', (req, res)=> {
    if(req.url == '/favicon.ico/') {
        res.end();
    } else {
        res.send('<h1>404 this page is not here or any where for that matter! You can create it though!</h1>')
    }
})


module.exports = router;
