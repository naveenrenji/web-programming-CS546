const helpers = require('../helpers');
const mongo = require('mongodb');

const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  helpers.validateMovie(
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
  )

  let newMovie = {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
  };
  newMovie.reviews = [];
  newMovie.overallRating = 0;

  const movieCollection = await movies();

  const insertInfo = await movieCollection.insertOne(newMovie);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add movie';

  const newId = insertInfo.insertedId.toString();

  const movie = await getMovieById(newId);
  movie._id = newId;
  return movie;
};

const getAllMovies = async () => {
  const movieCollection = await movies();
  const movieList = await movieCollection.find({}).toArray();
  if (!movieList) throw 'Could not get all Movies';
  if (movieList.length == 0) return [];
  movieList.forEach((element) => {
    element._id = element._id.toString()
  })
  return movieList;
};

const getMovieById = async (movieId) => {
  id = helpers.checkId(movieId);
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: mongo.ObjectId(id) });
  if (movie === null) throw 'No movie with that id';
  movie._id = id;
  return movie;
};

const removeMovie = async (movieId) => {
  id = helpers.checkId(movieId);
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: mongo.ObjectId(id) });
  const deletionInfo = await movieCollection.deleteOne({ _id: mongo.ObjectId(id) });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  }
  return `${movie.title} has been successfully deleted!`;
};

const updateMovie = async (
  movieId,
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {
  movieId = helpers.checkId(movieId)
  helpers.validateMovie(
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime
  );

  let newMovie = {
    title,
    plot,
    genres,
    rating,
    studio,
    director,
    castMembers,
    dateReleased,
    runtime,
  };

  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: mongo.ObjectId(id) });
  if (movie === null) throw 'No movie with that id';
  if (movie.title == newMovie.title && movie.plot == newMovie.plot && movie.genres == newMovie.genres && movie.rating == newMovie.rating && movie.studio == newMovie.studio && movie.director == newMovie.director && movie.castMembers == newMovie.castMembers && movie.dateReleased == newMovie.dateReleased && movie.runtime == newMovie.runtime)
    throw "Cannot update due to same values in new and old movies"

  await movieCollection.updateOne(
    { _id: mongo.ObjectId(movieId) },
    { $set: newMovie }
  );

  return await getMovieById(movieId);
};

const renameMovie = async (id, newName) => {
  //Not used for this lab
};

module.exports = {
  createMovie,
  getMovieById,
  removeMovie,
  updateMovie,
  getAllMovies,
};
