const express = require("express");
const mongoose = require('mongoose');
const { 
    MONGO_USER, 
    MONGO_PASSWORD, 
    MONGO_IP, 
    MONGO_PORT 
} = require("./config/config");

const postRouter = require("./routes/postRoutes");

const app = express();

// current retry logic is better than nothing
//      ideally this would set some kind of flag so that an error page 
//          would be loaded instead of the normal app page.
//      Even better would be to have internal and external users, 
//          so that internal users could see the error and external 
//          users would see what the business considered "appropriate".
const connectWithRetry = () => {
    mongoose
    .connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
    .then(() => console.log("successfully connected to DB"))
    .catch((e) => {
        console.log(e)
        setTimeout(connectWithRetry, 5000)
    });
};
// mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`)
// .then(() => console.log("successfully connected to DB"))
// .catch((e) => console.log(e));
connectWithRetry();

//the middleware
app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h2>Hi There - now with routes </h2>");
});

// localhost:3000/:id
app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
