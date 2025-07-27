const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  email: String,
  name: String,
  Price: Number,
  img: String,
});

module.exports = mongoose.model("Cart", cartSchema);
