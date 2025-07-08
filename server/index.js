const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use("/api", require("./api/users"));
app.use(router);

// ✅ Hybrid: run locally with listen, export for Vercel
  module.exports = app; // ✅ Required by Vercel

