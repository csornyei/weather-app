const express = require("express");
const app = express();

const PORT = process.env.SERVER_PORT || 3000;

app.get("/", (req, res) => {
    res.send("Hello world!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})