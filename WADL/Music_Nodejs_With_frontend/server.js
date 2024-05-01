// app.js

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const songDetails = require("./models");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/TEMP").then(() => {
  console.log("Database connected successfully");
});

app.get("/", (req, res) => {
  res.render("index");
});

//n) Insert array of 5 song documents in above Collection. [Document should have following field: Songname, Film, Music_director, singer]
// s) Add a new song which is your favorite.
app.post("/addSong", async (req, res) => {
  const { songName, film, director, singer } = req.body;
  await songDetails.create({
    songName,
    film,
    director,
    singer,
  });
  res.redirect("/getSongs");
});

//o) Display total count of documents and List all the documents in the browser.
// v) Display the above data in Browser in tabular format.
app.get("/getSongs", async (req, res) => {
  const songs = await songDetails.find();
  const totalCount = songs.length;
  res.render("table", { totalCount, songs });
});

// p) List specified Music Director songs.
app.get("/getSongs/:director", async (req, res) => {
  const director = req.params.director;
  const songs = await songDetails.find({ director: director });
  const totalCount = songs.length;
  res.render("table", { totalCount, songs });
});

// q) List specified Music Director songs sung by specified Singer
app.get("/getSongs/:director/:singer", async (req, res) => {
  const director = req.params.director;
  const singer = req.params.singer;
  const songs = await songDetails.find({ director: director, singer: singer });
  const totalCount = songs.length;
  res.render("table", { totalCount, songs });
});

// t) List Songs sung by Specified Singer from specified films.
app.get("/getSongs/:singer/:film", async (req, res) => {
  const film = req.params.film;
  const singer = req.params.singer;
  const songs = await songDetails.find({ film: film, singer: singer });
  const totalCount = songs.length;
  res.render("table", { totalCount, songs });
});

// Updated delete route to handle both GET and POST requests
// r) Delete the song which you don’t like.
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const student = await songDetails.findByIdAndDelete(id);
  res.redirect("/getSongs");
});

// Updated route for updating a song to use POST method and endpoint /update
// u) Update the document by adding Actor and Actress name.
app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { actor, actress } = req.body;

  // Using findOneAndUpdate to update the document
  const song = await songDetails.findByIdAndUpdate(id, {
    $set: {
      actor,
      actress,
    },
  });

  res.redirect("/getSongs");
});

app.listen(port, () => {
  console.log(`Connected to PORT: http://localhost:${port}`);
});
