import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Routes from './routes/index';
import dbConfig from './database';
import { Server } from 'socket.io';
import { clientConnected } from "./socket";
import { createClient } from "redis";
import { Forecast } from './models';

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;

let io: null | Server = null

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.set('view engine', 'ejs');
app.set("views", "src/views");
app.use("/public", express.static("src/public"));
app.use(Routes);

createConnection(dbConfig)
    .then((_connection) => {
        const expressServer = app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
        const io = new Server(expressServer);

        const subscriber = createClient(6379, "redis");
        subscriber.subscribe("forecast");

        subscriber.on("message", (_channel, message) => {
            const parsedMessage: Forecast = JSON.parse(message);
            io.to(`city-${parsedMessage.cityId}`).emit("forecast", parsedMessage);
        });
        io.on("connection", clientConnected);
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
