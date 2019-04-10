const axios = require('axios');
const standings = require('./data.default/standings.json');
let connectDB = require('./connect-db').connectDB;

// axios.get('https://api.overwatchleague.com/standings').then((res)=> {
//     console.log("got data",res.data);
//     standings = res.data;
// }).catch((e) => {
//     console.error("error fetching data", e);
// })

async function initializeDB() {
    let db = await connectDB();
    let collection = db.collection('standings');
    await collection.insertMany(standings);
}

initializeDB(); 