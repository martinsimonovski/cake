import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import router from './router';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan'; // logger

mongoose.connect('mongodb://localhost:polarcape-cake/polarcape-cake', { useNewUrlParser: true });

// app setup
const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

// server setup
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port);

console.log("Server listening on port: ", port);