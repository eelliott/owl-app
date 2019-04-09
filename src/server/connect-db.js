import * as teams from './data.default/teams';
import { connectDB } from './connect-db';

async function initializeDB() {
    let db = await connectDB();
    for (let collectionName in teams) {
        let collection = db.collection(collectionName);
        await collection.insertMany(teams[collectionName]);
    }
}

initializeDB();