const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const standings = require('./data.default/standings.json');
require('./initilize-db');
let connectDB = require('./connect-db').connectDB;

let port = 8888;

let app = express();

app.listen(port, console.log("Server listening on port", port));

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);

const updateLiveMatch = async live_match => {
    let db = await connectDB();
    let collection = db.collection('live_match');
    await collection.insertOne(live_match);
}

app.get('/', (req, res) => {
    res.json(standings);
    res.status(200).send();
});

app.get('/live-match', async (req, res) => {
    let live_match = {};
    await axios.get('https://api.overwatchleague.com/live-match', (req, res) => {
        live_match = res.data;
        console.log("live match",live_match);
    });
    await updateLiveMatch(live_match);
    res.status(200).send();
});