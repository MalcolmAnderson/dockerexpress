const express = require("express");
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT } = require("./config/config");


const app = express();

// mongoose.connect("mongodb://mba:mba@192.168.192.2:27017/?authSource=admin")
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
.then(() => console.log("successfully connected to DB"))
.catch((e) => console.log(e));

app.get("/", (req, res) => {
    res.send("<h2>Hi There - changing stuff</h2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
