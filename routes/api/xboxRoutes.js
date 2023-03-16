const express = require('express');
const router = express.Router();

// Fetch
// --------------------------------------------------
const fetch = (...args)=> import('node-fetch').then(({default: fetch}) => fetch(...args));

// Create Counter
// --------------------------------------------------
let count;

// Fetch our URL from Sample API's
// --------------------------------------------------
fetch('https://api.sampleapis.com/xbox/games')
    .then(res => res.json())
    .then(data => count = data.length)

// Create path for our Home Page
// ---------------------------------------------
router.get('/', (req, res)=>{
    const url = 'https://api.sampleapis.com/xbox/games'

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/home', {
                title: 'All Xbox Games',
                name: 'All Games',
                genre: 'All Genres',
                developer: 'All Developers',
                publisher: 'All Publishers',
                releaseDates: 'All Release Dates',
                data
            })
        })
});

// In the Online API there is a type category. We will add a path
// Adding type path => localhost:3000/type/:type
// ---------------------------------------------
router.get('/name/:name', (req, res)=>{
    const type = req.params.type
    const url = 'https://api.sampleapis.com/xbox/games'

    fetch(url)
        .then(res=> res.json())
        .then(data => {
            // Create an Arry for the item types
            const nameArr = []
            // push type items into the empty typeArr
            data.forEach(item => {
                if(item.name == name) {
                    nameArr.push(item)
                }
            })

            return nameArr
        })
        // Grouping all the games by type
        .then(nameArr => {
            res.render('pages/games', {
                name: 'name',
                data: nameArr
            })
        })
})

// jokes_single page
// localhost:3000/games/:id
// ---------------------------------------------
router.get('/:id', (req, res)=> {
    const id = req.params.id
    const url = `https://api.sampleapis.com/xbox/games/${id}`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            res.render('pages/psGame_single', {
                title: `${data.setup}`,
                name: `${data.setup}`,
                data,
                count
            })
        })
})



module.exports = router;