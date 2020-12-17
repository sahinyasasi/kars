const express = require("express");
const PORT = 3000;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Kar = require("./models/kars");
let app = express();
mongoose.connect("mongodb://localhost:27017/karsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/brand", (req, res) => {
  res.render("brand");
});
app.get("/model", (req, res) => {
  res.render("model");
});
app.get("/variant", (req, res) => {
  res.render("variant");
});
app.listen(PORT, () => console.log("server started @port 3000"));
