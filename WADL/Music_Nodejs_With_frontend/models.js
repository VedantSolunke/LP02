const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
  songName: String,
  film: String,
  director: String,
  singer: String,
  actor: String,
  actress: String,
});

module.exports = mongoose.model("songDetails", songSchema);
