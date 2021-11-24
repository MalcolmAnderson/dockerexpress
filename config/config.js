module.exports = {
    MONGO_IP: process.env.MONGO_IP || "mongo",
    MONGO_PORT: process.env.MONGO_PORT || 27017,
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,

    APP_PORT: process.env.APP_PORT || 3000 // APP_PORT doesn't work, and that's ok right now
}