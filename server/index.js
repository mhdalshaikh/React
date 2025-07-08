const express = require("express");
const cors = require("cors"); // ✅ import cors
const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const router = express.Router();

// ✅ enable CORS for all origins
app.use(cors());

// parse urlencoded and json
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// routes
router.use("/api", require("./api/users"));
app.use(router);



// ✅ Hybrid: run locally with listen, export for Vercel
  module.exports = app; // ✅ Required by Vercel

