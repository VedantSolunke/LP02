const express = require("express");
const mongoose = require("mongoose");
const studentDetails = require("./models");
const app = express();
const port = 3001;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/DEMO_Students").then(() => {
  console.log("Connected Succesfully");
});

app.get("/", async (req, res) => {
  res.render("index");
});

// add
app.post("/add", async (req, res) => {
  const {
    rollno,
    name,
    wad_marks,
    cc_marks,
    dsbda_marks,
    cns_marks,
    ai_marks,
  } = req.body;

  let student = await studentDetails.create({
    rollno,
    name,
    wad_marks,
    cc_marks,
    dsbda_marks,
    cns_marks,
    ai_marks,
  });

  res.redirect("/getStudents");
});

// display
app.get("/getStudents", async (req, res) => {
  const students = await studentDetails.find();
  const totalCount = students.length;
  res.render("table", { totalCount: totalCount, students: students });
});

// delete
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const students = await studentDetails.findByIdAndDelete(id);
  res.redirect("/getStudents");
});

// update
app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const marksToUpdate = parseInt(req.body.marksToUpdate);
  console.log(marksToUpdate);

  const students = await studentDetails.findByIdAndUpdate(id, {
    $inc: {
      wad_marks: marksToUpdate,
      cc_marks: marksToUpdate,
      cns_marks: marksToUpdate,
      dsbda_marks: marksToUpdate,
      ai_marks: marksToUpdate,
    },
  });
  res.redirect("/getStudents");
});

// List the names of students who got more than 20 marks in DSBDASubject in browser.
app.get("/gt20dsbda", async (req, res) => {
  const students = await studentDetails.find({
    dsbda_marks: {
      $gt: 20,
    },
  });
  const totalCount = students.length;
  res.render("table", { totalCount: totalCount, students: students });
});

// List the names who got more than 25 marks in all subjects inbrowser.
app.get("/gt25all", async (req, res) => {
  const students = await studentDetails.find({
    dsbda_marks: { $gt: 25 },
    cc_marks: { $gt: 25 },
    cns_marks: { $gt: 25 },
    wad_marks: { $gt: 25 },
    ai_marks: { $gt: 25 },
  });
  const totalCount = students.length;
  res.render("table", { totalCount: totalCount, students: students });
});

//List the names who got less than 40 in both cc and wad inbrowser.
app.get("/lt20", async (req, res) => {
  const students = await studentDetails.find({
    cc_marks: { $lt: 40 },
    wad_marks: { $lt: 40 },
  });
  const totalCount = students.length;
  res.render("table", { totalCount: totalCount, students: students });
});

app.listen(port, () => {
  console.log(`connected at : http://localhost:${port}`);
});
