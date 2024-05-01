const express = require("express");
const mongoose = require("mongoose");
const SongDetails = require("./SongDetails");
const app = express();
const port = 3000;
app.use(express.json());

//n) Insert array of 5 song documents in above Collection. [Document should have following field: Songname, Film, Music_director, singer]
// s) Add a new song which is your favorite.
app.post("/add", async (req, res) => {
  const { songName, film, director, singer } = req.body;

  const song = await SongDetails.create({
    songName,
    film,
    director,
    singer,
  });

  res.send({ message: "Data inserted Successfully", song });
});

//o) Display total count of documents and List all the documents in the browser.
app.get("/totalCount", async (req, res) => {
  const songs = await SongDetails.find();
  res.send({ "total Count : ": songs.length, songs });
});

// p) List specified Music Director songs.
app.get("/songOfMusicDirector/:director", async (req, res) => {
  const director = req.params.director;
  const songs = await SongDetails.find({ director: director });
  res.send(songs);
});

// q) List specified Music Director songs sung by specified Singer
app.get("/songOfDirectorNSinger/:director/:singer", async (req, res) => {
  const director = req.params.director;
  const singer = req.params.singer;
  const songs = await SongDetails.find({ director: director, singer: singer });
  res.send(songs);
});

// r) Delete the song which you don’t like.
app.delete("/deleteSong/:songName", async (req, res) => {
  const songName = req.params.songName;
  const songs = await SongDetails.deleteOne({ songName: songName });
  res.send({ message: "Song Deleted Successfully", songs });
});

// t) List Songs sung by Specified Singer from specified films.
app.get("/songOfSingerNFilm/:singer/:film", async (req, res) => {
  const singer = req.params.singer;
  const film = req.params.film;
  const songs = await SongDetails.find({ singer: singer, film: film });
  res.send(songs);
});

// u) Update the document by adding Actor and Actress name.
app.put("/songUpdate/:songName", async (req, res) => {
  const { songName, actor, actress } = req.body;

  const song = await SongDetails.findOneAndUpdate(
    { songName: songName },
    {
      $set: {
        actor,
        actress,
      },
    },
    { new: true }
  );
  console.log(song);
  res.send(song);
});

// v) Display the above data in Browser in tabular format.
app.get("/displayAll", async (req, res) => {
  const songs = await SongDetails.find();

  let html = "<table border =1 style='border-collapse: collapse'>";
  html += `<tr>
    <th> Song Name </th>
    <th> Film Name </th>
    <th> Music Director </th>
    <th> Singer </th>
    <th> Actor </th>
    <th> Actress </th>
  </tr>`;

  songs.map(function (song) {
    html += "<tr>";
    html = html + "<td>" + song.songName + "</td>";
    html = html + "<td>" + song.film + "</td>";
    html = html + "<td>" + song.director + "</td>";
    html = html + "<td>" + song.singer + "</td>";
    html = html + "<td>" + song.actor + "</td>";
    html = html + "<td>" + song.actress + "</td>";
    html += "</tr>";
  });
  html += "</table>";

  res.send(html);
});

mongoose
  .connect("mongodb://localhost:27017/MUSICAL")
  .then(() => {
    app.listen(port, function () {
      console.log(
        `Database connected succesfully at PORT : http://localhost:${port}`
      );
    });
  })
  .catch((err) => {
    console.log("Error occured", err);
  });
