const mongoose = require('mongoose');

const movSchema = mongoose.Schema({
    title: String,
    release: Number,
    format: String,
    stars: Array
});

const Mov = module.exports = mongoose.model('movies', movSchema);

module.exports.getMovies = function(callback) {
    Mov.find(callback);
};

module.exports.getMovieById = function(id, callback) {
    Mov.findById(id, callback);
};

module.exports.addMovie = function(movie, callback) {
    Mov.create(movie, callback);
};

module.exports.upMovie = function(id, movie, options, callback) {
    const query = {_id: id},
        update = {
            title: movie.title,
            release: movie.release,
            stars: movie.stars,
            format: movie.format
        };

    Mov.findOneAndUpdate(query, update, options, callback);
};

module.exports.delMovie = function(id, callback) {
    Mov.remove({_id: id}, callback);
};
