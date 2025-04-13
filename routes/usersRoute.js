const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const moment = require("moment");
const fs = require("fs");
const path = require("path");


router.post("/register", async (req, res) => {
  const logFilePath = path.join(__dirname, "../logs/accounts.log");

  try {
    const newuser = new User(req.body);
    const user = await newuser.save();
    const logMessage = `{User created successfully with: \n\tUser ID: ${user._id} \n\tUser name: ${user.username} \n\tDate: ${moment().utcOffset(-0).format("MMM DD YYYY, HH:mm:ss [UTC]")}\n}\n\n`;
    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error("Error writing to log file:", err);
      } else {
        console.log("Log message saved successfully.");
      }
    }
    );
    res.send("User Created Successfully");
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/login", async (req, res) => {
  const logFilePath = path.join(__dirname, "../logs/accounts.log");

  try {
    const user = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (user) {
      const logMessage = `{User log in successfully with: \n\tUser ID: ${user._id} \n\tUserName: ${user.username} \n\tDate: ${moment().utcOffset(-0).format("MMM DD YYYY, HH:mm:ss [UTC]")}\n}\n\n`;
      fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
          console.error("Error writing to log file:", err);
        } else {
          console.log("Log message saved successfully.");
        }
      }
      );
      res.send(user);
    } else {
      return res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);

    const user = await User.findOne({ _id: req.body._id });

    res.send(user);
  } catch (error) {
    return res.status(400).json({ error });
  }
});


router.get("/getallusers", async (req, res) => {

  try {
    const users = await User.find()
    res.send(users)
  } catch (error) {
    return res.status(400).json({ error });
  }

});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.send(user)
  } catch (error) {
    return res.status(400).json({ error });
  }
}
);

module.exports = router;
