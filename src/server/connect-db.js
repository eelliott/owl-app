var MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/owldata';
let db = null;


async function connectDB() {
    if (db) return db;
    let client = await MongoClient.connect(url, { useNewUrlParser: true });
    db = client.db();
    console.info("Got DB", db);
    return db;
}

module.exports = {
    connectDB: connectDB
};