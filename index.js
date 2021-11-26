const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)



const {
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_IP,
    MONGO_PORT,
    REDIS_URL,
    REDIS_PORT,
    SESSION_SECRET,
} = require("./config/config");

let redisClient = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
});

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

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
app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUninitialized: false,
        httpOnly: true,
        maxAge: 30000
    }
}))
// app.use(
//     session({
//         store: new RedisStore({ client: redisClient }),
//         saveUninitialized: false,
//         secret: 'keyboard cat',
//         resave: false,
//     })
// )

app.use(express.json());


// localhost:3000
app.get("/", (req, res) => {
    res.send("<h2>Hyellow there Mossifer</h2>");
});

// localhost:3000/:id
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));


