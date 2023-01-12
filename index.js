
const express = require("express");
const dotenv = require("dotenv");
//const mongodb = require("mongodb");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./db/db");


dotenv.config();
const app = express();
const port = 8080;
app.use(express.json());
// connection middleware
mongoose.set("strictQuery", false);
mongoose.connect(process.env.CONNECTION, { useNewUrlParser: true }).catch((err)=>console.log(err))
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('style'));



app.use("/product", require("./routes/product"));


// the sort shit not working 
app.get("/", async (req, res) => {
    const users = await User.find()
    res.render('index',{users:users})
  
});


// port where the server is running
app.listen(port, () => {
  console.log("server is running on port 8080");
});




