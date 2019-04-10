const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
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

app.get('/', async (req, res) => {
    let db = await connectDB();
    res.json(db.collection('owl-divisions'));
});