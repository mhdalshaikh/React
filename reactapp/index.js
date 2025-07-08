const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./api/users");

const app = express();

// ✅ Use MongoDB Atlas connection string here
mongoose.connect("your-mongo-uri");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api", userRoutes);

// ✅ Important: do NOT call app.listen()
// Instead, export the app:
module.exports = app;
