const mongoose = require("mongoose");

const SongDetailSchema = mongoose.Schema({
  songName: String,
  film: String,
  director: String,
  singer: String,
  actor: String,
  actress: String,
});

const SongDetails = mongoose.model("SongDetails", SongDetailSchema);
module.exports = SongDetails;
