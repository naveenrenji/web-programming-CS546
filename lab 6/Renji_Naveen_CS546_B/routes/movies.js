//require express and express router as shown in lecture code
const helpers = require('../helpers');
const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      movieItems = [];
      const movieList = await moviesData.getAllMovies();
      movieList.forEach((movieItem) => {
        movieItems.push({
          _id: movieItem._id,
          title: movieItem.title
        })
      });
      res.status(200).json(movieItems);
    } catch (e) {
      res.status(500).json({ error: e.message, e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    const movieData = req.body;
    try {
      helpers.validateMovie(movieData.title, movieData.plot, movieData.genres, movieData.rating, movieData.studio, movieData.director, movieData.castMembers, movieData.dateReleased, movieData.runtime);
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }

    try {
      const { title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime } = movieData;
      const newMovie = await moviesData.createMovie(title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime);
      res.json(newMovie);
    } catch (e) {
      res.status(500).json({ error: e.message, e });
    }
  });

router
  .route('/:id')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = helpers.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }
    try {
      const movie = await moviesData.getMovieById(req.params.id);
      res.json(movie);
    } catch (e) {
      res.status(404).json({ error: e.message, e });
    }
  })
  .delete(async (req, res) => {
    //code here for DELETE
    try {
      req.params.id = helpers.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }
    try {
      await moviesData.getMovieById(req.params.id);
    } catch (e) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    try {
      await moviesData.removeMovie(req.params.id);
      res.status(200).json({ movieId: req.params.id, deleted: true });
    } catch (e) {
      res.status(500).json({ error: e.message, e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    const movieData = req.body;
    try {
      if (movieData.reviews) throw "cannot update reviews";
      helpers.validateMovie(movieData.title, movieData.plot, movieData.genres, movieData.rating, movieData.studio, movieData.director, movieData.castMembers, movieData.dateReleased, movieData.runtime);
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }

    try {
      await moviesData.getMovieById(req.params.id);
    } catch (e) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    try {
      updatedData = await moviesData.updateMovie(req.params.id, movieData.title, movieData.plot, movieData.genres, movieData.rating, movieData.studio, movieData.director, movieData.castMembers, movieData.dateReleased, movieData.runtime);
      res.json(updatedData);
    } catch (e) {
      res.status(500).json({ error: e.message, e });
    }
  });

module.exports = router;