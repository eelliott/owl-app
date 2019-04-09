import express from 'express';
import cors from 'cors';
import bodyParser from "body-parser";
import { connectDB } from './connect-db';

let port = 8888;
let app = express();

app.listen(port, console.log("Server listening on port", port));

app.use(
    cors(),
    bodyParser.urlencoded({extended:true}),
    bodyParser.json()
);

