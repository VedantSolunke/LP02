// server.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Student = require("./models");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/student").then(() => {
  console.log("Database connected successfully");
});

app.get("/", (req, res) => {
  res.render("index");
});

// c) Insert array of documents in above Collection. [Document have following field: Name, Roll_No, WAD_Marks, CC_Marks, DSBDA_Marks,CNS_Marks,AI_marks]
app.post("/addStudent", async (req, res) => {
  const {
    name,
    rollno,
    wad_marks,
    cc_marks,
    dsbda_marks,
    cns_marks,
    ai_marks,
  } = req.body;

  const student = await Student.create({
    name,
    rollno,
    wad_marks,
    cc_marks,
    dsbda_marks,
    cns_marks,
    ai_marks,
  });

  // res.send({ message: "Data Inserted successfully", student });
  res.redirect("/getStudents");
});

// j) Display the Students data in Browser in tabular format.
// d) Display total count of documents and List all the documents in browser.
app.get("/getStudents", async (req, res) => {
  const student = await Student.find();
  const totalCount = student.length;

  res.render("table", { totalCount: totalCount, student: student });
});

// e) List the names of students who got more than 20 marks in DSBDA Subject in browser.
app.get("/dsbdagt20", async (req, res) => {
  const student = await Student.find({ dsbda_marks: { $gt: 20 } });
  const totalCount = student.length;
  res.render("table", { totalCount: totalCount, student: student });
});

//h) List the names who got less than 40 in both wad and cc in browser.
app.get("/wadcclt40", async (req, res) => {
  try {
    const students = await Student.find({
      wad_marks: { $lt: 40 },
      cc_marks: { $lt: 40 },
    });
    const totalCount = students.length;
    res.render("table", { student: students, totalCount: totalCount });
  } catch (err) {
    res.json({ message: "Error occurred" });
  }
});

// g) List the names who got more than 25 marks in all subjects in browser.
app.get("/allSubjectsGt25", async (req, res) => {
  const student = await Student.find({
    wad_marks: { $gt: 25 },
    cc_marks: { $gt: 25 },
    dsbda_marks: { $gt: 25 },
    cns_marks: { $gt: 25 },
    ai_marks: { $gt: 25 },
  });

  const totalCount = student.length;
  res.render("table", { totalCount: totalCount, student: student });
});

// i) Remove specified student document from collection.
app.post("/deleteStudent/:id", async (req, res) => {
  const id = req.params.id;
  const student = await Student.findByIdAndDelete(id);
  res.redirect("/getStudents");
});

// f) Update the marks of Specified students by 10.
app.post("/updateMarks/:id", async (req, res) => {
  const id = req.params.id;
  const markstoUpdate = parseInt(req.body.marksToUpdate);

  const student = await Student.findByIdAndUpdate(id, {
    $inc: {
      wad_marks: markstoUpdate,
      cc_marks: markstoUpdate,
      dsbda_marks: markstoUpdate,
      cns_marks: markstoUpdate,
      ai_marks: markstoUpdate,
    },
  });
  res.redirect("/getStudents");
});

app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
