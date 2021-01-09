const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const { default: Axios } = require("axios");

const app = express();

//PORT stored in .env
const PORT = process.env.PORT || 4000;

//Express middleware
app.use(cors());
app.use(express.json()); //Allow passing of json files

//uri stored in .env
const uri = process.env.ATLAS_URI;

//connect with uri
mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

const connection = mongoose.connection;

connection.once("open", function () {
  console.log("Connection with MongoDB was successful");
});

//require router
const router = require("./routes/router.js");

//use routes in router at home url
app.use("/", router);

app.use(express.static("./public"));

//listen on specified port, and console log port number
app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});
