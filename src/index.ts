import express, { Application } from 'express';
import dotenv from 'dotenv';

const app: Application = express();
dotenv.config();

const PORT = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})