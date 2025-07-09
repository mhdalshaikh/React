const express = require("express");
const jwt = require("jwt-simple");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const User = require("../models/user");

const router = express.Router();
const secret = "supersecret";

// Middleware to parse body
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Register route
router.post("/user", async function (req, res) {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing username and/or password" });
  }

  const hash = bcrypt.hashSync(password, 10);

  const newUser = new User({
    username,
    password: hash,
    role
  });

  try {
    await newUser.save();
    res.sendStatus(201);
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// Login route
router.post("/auth", async function (req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(401).json({ error: "Missing username and/or password" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: "Bad username" });
    }

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.encode({ username: user.username,role:user.role }, secret);
      res.json({ token });
    } else {
      res.status(401).json({ error: "Bad password" });
    }
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// Status route (protected)
router.get("/status", async function (req, res) {
  const token = req.headers["x-auth"];
  if (!token) {
    return res.status(401).json({ error: "Missing X-Auth header" });
  }

  try {
    const decoded = jwt.decode(token, secret);
    const users = await User.find({}, "username status");
    res.json(users);
  } catch (ex) {
    res.status(401).json({ error: ex.message });
  }
});

module.exports = router;
