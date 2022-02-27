const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      const isValid = await bcrypt.compare(password, existingUser.password);
      if (isValid) {
        return res.json({ success: true, user: existingUser });
      } else {
        return res.json({ success: false, msg: "Incorrect password" });
      }
    } else {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const user = await new User({ userName, password: hash }).save();
      return res.json({ success: true, user });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("internal server error");
  }
});

module.exports = router;
