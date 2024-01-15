const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dbUrl = process.env.DB_URL;

//connecting to db
function ConnectToMongoDb() {
    try {
        mongoose.connect(dbUrl);
        console.log("connected to db");
    } catch (err) {
        console.log("Cannot connect to db");
    }
}
ConnectToMongoDb();

// Middleware to handle JSON request body
app.use(express.json());

//end points
app.get("/", (req, res) => {
    console.log("/ called");
    res.send("Server is running");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, (req, res) => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;