const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  rollno: Number,
  name: String,
  wad_marks: Number,
  cc_marks: Number,
  dsbda_marks: Number,
  cns_marks: Number,
  ai_marks: Number,
});

module.exports = mongoose.model("studentDetails", studentSchema);
