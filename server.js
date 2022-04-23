//import express package and initialize app variable by setting it to value of express()
const { Console } = require('console');
const express = require('express');
const app = express();
const path = require('path');

const PORT = 3005;
const fs = require('fs');

//require db.json file
const db = require('./Develop/db/db.json')

//middleware
app.use(express.json());


//add static routes for notes.html page and index.html page
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/Develop/public/notes.html')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Develop/public/index.html')
})

// GET API route
app.get('/api', (req, res) => {
    res.json(db);
})

//POST API route
app.post('/api', (req, res) => {
    //destructure req.body
    const { title, text } = req.body;
    console.log(req.body);

    //validation to check for both title and text properties present
    // if (title && text) {
    //     const newNote = {
    //         title,
    //         text
    //     };
        //add to db.json file
        fs.writeFile(
            path.join(__dirname + '/Develop/db/db.json'), 
            JSON.stringify(newNote), (err) => {
            if(err) {
                console.log('something went wrong');
            } else {
                console.log('success');
            }
        })
    // } else {
    //     res.status(400).send('Post not properly formatted.')
    // }
})



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});



// function validateBody(body) {
//     if (!body.title || typeof body.title !== 'string') {
//         return false;
//     }
//     if (!body.text || typeof body.text !== 'string') {
//         return false;
//     }
// }N