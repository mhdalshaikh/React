const express = require("express");
const bodyParser = require("body-parser");
const User = require("./models/user");

const app = express();
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use("/api", require("./api/users"));

app.use(router);

module.exports = app; // ✅ export without app.listen()
