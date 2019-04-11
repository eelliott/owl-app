let connectDB = require('./connect-db').connectDB;


async function initializeDB() {
    let db = await connectDB();
    let collection = db.collection('standings');
    await collection.insertOne({});
    collection = db.collection('live-match');
    await collection.insertOne({});
}

initializeDB(); 