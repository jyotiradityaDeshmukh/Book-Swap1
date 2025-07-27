const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  email1: String,
  email2: String,
  book_name: String,
});

cartSchema.index({ email2: 1, book_name: 1 }, { unique: true });

module.exports = mongoose.model("swap_req", cartSchema);
