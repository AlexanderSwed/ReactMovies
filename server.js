const express = require('express')/*,
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Mov = require('./db/movies')*/;

const config = require('./config');

const app = express();
/*app.use(bodyParser.json());
mongoose.connect(config.mongoose.uri);
const db = mongoose.connection;*/

app.use(express.static('public'));

/*app.get('/', (req,res) => {
    res.send("Use /api/mov for the API");
});

app.get('/api/movies', (req, res) => {
    Mov.getMovies( function(err, movies) {
        if (err) throw new Error(err);
        res.json(movies);
    });
});

app.get('/api/movies/:_id', (req, res) => {
    Mov.getMovieById(req.params._id, function(err, movie) {
        if (err) { throw new Error(err); }
        res.json(movie);
    });
});

app.post('/api/movies', (req, res) => {
    const movie = req.body;
    Mov.addMovie( movie, function(err, movie) {
        if (err) { throw new Error(err); }
        res.json(movie);
    });
});

app.put('/api/movies/:_id', (req, res) => {
    const id = req.params._id,
        movie = req.body;
    Mov.upMovie( id, movie, {}, function(err, movie) {
        if (err) { throw new Error(err); }
        res.json(movie);
    });
});

app.delete('/api/movies/:_id', (req, res) => {
    const id = req.params._id;
    Mov.delMovie( id, function(err, movie) {
        if (err) { throw new Error(err); }
        res.json(movie);
    });
});*/

app.listen(config.port, function(){
    console.log(`Express server listening on port ${config.port}`);
});
