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
    //create response that shows our request in json format
    res.json(req.body);

        //to append new content to db.json, we need to read the file  
    fs.readFile('Develop/db/db.json', 'utf-8', function (err, data) {
        if (err) throw err
        //then convert it's contents to a JS object using JSON.parse
        var objectArr = JSON.parse(data)
        //push the object to the objectArr
        objectArr.push(req.body)
        //we now have an array with an object
        console.log(objectArr)

        //create new file with new objectArr and convert the data into JSON format
        fs.writeFile('Develop/db/db.json', JSON.stringify(objectArr), 'utf-8', function (err) {
            if (err) throw err
            console.log('Done!')
        })
    })
})
    
    



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});


//   need to add validation to post request route 
//   why is data formatting all squished in db.json after posting?
//   insomnia is requiring square brackets...this makes json file have an array inside the existing array...likely because im using array push method...look into another solution