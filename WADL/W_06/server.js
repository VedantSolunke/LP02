const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Define Schema
const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    Actor: String,
    Actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// Insert array of 5 song documents
const songs = [
    { Songname: 'ABC', Film: 'Film1', Music_director: 'Music1', singer: 'Singer1' },
    { Songname: 'DEF', Film: 'Film2', Music_director: 'Music2', singer: 'Singer2' },
    { Songname: 'GHI', Film: 'Film3', Music_director: 'Music1', singer: 'Singer3' },
    { Songname: 'JKL', Film: 'Film4', Music_director: 'Music3', singer: 'Singer1' },
    { Songname: 'MNO', Film: 'Film5', Music_director: 'Music2', singer: 'Singer2' }
];

// Create Database called music and Collection called songdetails
db.once('open', async () => {
    console.log('Connected to MongoDB');
    try {
        await Song.insertMany(songs);
        console.log('Documents inserted successfully');
    } catch (error) {
        console.error(error);
    }
});

// Middleware to display JSON in browser
app.use(express.json());

// Display total count of documents
app.get('/total', async (req, res) => {
    try {
        const count = await Song.countDocuments();
        res.send(`Total count of documents: ${count}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// List all documents
app.get('/list', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// List songs of specified Music Director
app.get('/musicdirector/:director', async (req, res) => {
    const director = req.params.director;
    try {
        const songs = await Song.find({ Music_director: director });
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// List songs of specified Music Director sung by specified Singer
app.get('/musicdirector/:director/singer/:singer', async (req, res) => {
    const director = req.params.director;
    const singer = req.params.singer;
    try {
        const songs = await Song.find({ Music_director: director, singer: singer });
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Delete a song by Songname
app.delete('/delete/:songname', async (req, res) => {
    const songname = req.params.songname;
    try {
        await Song.deleteOne({ Songname: songname });
        res.send('Song deleted successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Add a new song
app.post('/add', async (req, res) => {
    const { Songname, Film, Music_director, singer, Actor, Actress } = req.body;
    try {
        await Song.create({ Songname, Film, Music_director, singer, Actor, Actress });
        res.send('Song added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// List Songs sung by Specified Singer from specified film
app.get('/film/:film/singer/:singer', async (req, res) => {
    const film = req.params.film;
    const singer = req.params.singer;
    try {
        const songs = await Song.find({ Film: film, singer: singer });
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Update the document by adding Actor and Actress name
app.put('/update/:songname', async (req, res) => {
    const songname = req.params.songname;
    const { Actor, Actress } = req.body;
    try {
        await Song.updateOne({ Songname: songname }, { $set: { Actor, Actress } });
        res.send('Song updated successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Display the above data in Browser in tabular format
app.get('/tabular', async (req, res) => {
    try {
        const songs = await Song.find();
        res.send(`
            <table border="1">
                <tr>
                    <th>Song Name</th>
                    <th>Film Name</th>
                    <th>Music Director</th>
                    <th>Singer</th>
                    <th>Actor</th>
                    <th>Actress</th>
                </tr>
                ${songs.map(song => `
                    <tr>
                        <td>${song.Songname}</td>
                        <td>${song.Film}</td>
                        <td>${song.Music_director}</td>
                        <td>${song.singer}</td>
                        <td>${song.Actor || ''}</td>
                        <td>${song.Actress || ''}</td>
                    </tr>
                `).join('')}
            </table>
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
