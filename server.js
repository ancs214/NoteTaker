//import express package and initialize app variable by setting it to value of express()

const express = require('express');
const app = express();
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3000;
const host = '0.0.0.0';
const fs = require('fs');

//require db.json file
let db = require('./db/db.json');

//middleware
app.use(express.json());
app.use(express.static('public'));


//add static routes for notes.html page and index.html page
app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// GET API route
app.get('/api/notes', (req, res) => {
    res.json(db);
})

//POST API route
app.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();
    db.push(req.body);
    fs.writeFile('./db/db.json', JSON.stringify(db), function (err) {
        if (err) throw err
        console.log('Done!')
    })
    //create response that shows our request in json format
    res.json(req.body);
})

//DELETE API route
app.delete('/api/notes/:id', (req, res) => {
    //destructure req object
    const { id } = req.params;
    
    //iterate over db array to compare ids. if ids are equal, delete from array
    for(let i=0; i<db.length; i++) {
        if (id === db[i].id) {
            db.splice(i, 1)
        } else {
            res.status(404).send();
        }
    }
    
    //write new db array to db.json file
    fs.writeFile('./db/db.json', JSON.stringify(db), function(err){
        if (err) throw err
    })

    res.send('DONE!');
})




app.listen(PORT, host, () => {
    console.log(`API server now on port ${PORT}!`);
});


