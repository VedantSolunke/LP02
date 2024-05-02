const express = require("express");
const mongoose = require("mongoose");
const songDetails = require("./models");

const app = express();
const port = 3001;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.render("index");
});

// Add songs
app.post("/add", async (req, res) => {
  const { songName, film, director, singer } = req.body;

  const songs = songDetails.create({
    songName,
    film,
    director,
    singer,
  });

  res.redirect("/getSongs");
});

// Display songs and total count
app.get("/getSongs", async (req, res) => {
  const songs = await songDetails.find();
  const totalCount = songs.length;
  res.render("table", { totalCount: totalCount, songs: songs });
});

// Delete song
app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const songs = await songDetails.findByIdAndDelete(id);
  res.redirect("/getSongs");
});

// update actor and actress
app.post("/update/:id", async (req, res) => {
  const id = req.params.id;
  const { actor, actress } = req.body;
  const songs = await songDetails.findByIdAndUpdate(id, {
    $set: {
      actor,
      actress,
    },
  });
  res.redirect("/getSongs");
});

// get songs with particular director
app.get("/getSongsDirector", async (req, res) => {
  const director = req.query.director;
  const songs = await songDetails.find({ director: director });
  const totalCount = songs.length;
  res.render("table", { totalCount: totalCount, songs: songs });
});

// List specified Music Director songs sung by specified Singer
app.get("/getSongs/:director/:singer", async (req, res) => {
  const director = req.params.director;
  const singer = req.params.singer;
  const songs = await songDetails.find({ director: director, singer: singer });
  const totalCount = songs.length;
  res.render("table", { totalCount: totalCount, songs: songs });
});

// List Songs sung by Specified Singer from specified films
app.get("/getSongs/:singer/:film", async (req, res) => {
  try {
    const singer = req.params.singer;
    const film = req.params.film;
    // const songs = await songDetails.find({ singer: singer, film: film });
    const songs = await songDetails.find({ singer, film });

    const totalCount = songs.length;

    res.render("table", { totalCount: totalCount, songs: songs });
  } catch (error) {
    console.error("Error fetching songs:", error);
    res.status(500).send("Internal Server Error");
  }
});

mongoose.connect("mongodb://localhost:27017/DEMO_MUSICAL").then(() => {
  console.log("Connected Succesfully");
});

app.listen(port, () => {
  console.log(`Connected at : http://localhost:${port}`);
});
