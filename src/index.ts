import express, { Application } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import Routes from "./routes/index";

dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;

const app: Application = express();
app.use(express.json());
app.use(morgan("tiny"));
app.use(Routes);

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})