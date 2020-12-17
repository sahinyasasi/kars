const mongoose = require("mongoose");

const karsSchema = new mongoose.Schema({
  brand: String,
  model: String,
  variant: String,
});
const Kar = new mongoose.model("Kar", karsSchema);
module.exports = Kar;
