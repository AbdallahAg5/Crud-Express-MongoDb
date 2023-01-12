const express = require("express");
const User = require("../db/db");
const mongoose = require("mongoose");
const ProductRoute = express.Router();

ProductRoute.use(express.json());

// add route
ProductRoute.post("/addUser", async (req, res) => {
  // create new document
  // await keyword used to wait for the instruction before moving to the onther instruction
  const user = await User.create({
    FirstName: req.body.FirstName,
    Age: req.body.Age,
    Password: req.body.PassWord,
    "Adresse.City": req.body.City,
    Email: req.body.Email,
  });
  // save the changes to the db
  await user.save();
  res.redirect("/");
});

// delete route
ProductRoute.post("/deleteUser/:id", async (req, res) => {
  var id = req.params.id;
  console.log(id);
  const user = await User.deleteOne({ _id: id });
  console.log(user);
  res.redirect("/");
});

// update routers
ProductRoute.get("/updateUser/:id", async (req, res) => {
  var id = req.params.id;
  const user = await User.find({ _id: req.params.id });
  console.log(user);
  res.render("update", {
    id: user[0]._id,
    FirstName: user[0].FirstName,
    Age: user[0].Age,
    Email: user[0].Email,
    PassWord: user[0].Password,
    LastName: user[0].LastName,
    City: user[0].Adresse.City,
  });
});

ProductRoute.post("/updateUser/:id", async (req, res) => {
  var id = req.params.id;
  const user = await User.findByIdAndUpdate(id, {
    FirstName: req.body.FirstName,
    LastName: req.body.LastName,
    Age:req.body.Age,
    Email:req.body.Email,
    PassWord:req.body.PassWord,
    Adresse: { City: req.body.City },
  });
  res.redirect("/");
});

ProductRoute.get("/sortedUsers", async (req, res) => {
  var users = await User.find().sort({ Age: -1 });
  res.render("index", { users: users });
});

module.exports = ProductRoute;
