import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Routes from './routes/index';
import dbConfig from './database';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(Routes);

app.get("/", (req, res) => {
    res.send("Hello world!");
});

createConnection(dbConfig)
    .then((_connection) => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
