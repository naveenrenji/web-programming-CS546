//require express and express router as shown in lecture code
const helpers = require('../helpers');
const express = require('express');
const router = express.Router();
const data = require('../data');
const moviesData = data.movies;
const reviewsData = data.reviews;



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
      const review = await reviewsData.getAllReviews(req.params.id);
      if (review.length === 0)
        res.status(404).json({ error: 'no reviews for this movie' });
      else
        res.json(review);
    } catch (e) {
      res.status(404).json({ error: e.message, e });
    }
  })
  .post(async (req, res) => {
    //code here for POST
    try {
      req.params.id = helpers.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }
    const reviewData = req.body;
    try {
      helpers.validateReview(req.params.id, reviewData.reviewTitle, reviewData.reviewerName, reviewData.review, reviewData.rating);
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }

    try {
      const {
        reviewTitle,
        reviewerName,
        review,
        rating } = reviewData;
      const newReview = await reviewsData.createReview(req.params.id, reviewTitle, reviewerName, review, rating);
      const movie = await moviesData.getMovieById(req.params.id);
      res.json(movie);
    } catch (e) {
      res.status(500).json({ error: e.message, e, e });
    }
  });

router
  .route('/review/:id')
  .get(async (req, res) => {
    //code here for GET
    try {
      req.params.id = helpers.checkId(req.params.id, 'Id URL Param');
    } catch (e) {
      return res.status(400).json({ error: e.message, e });
    }
    try {
      const review = await reviewsData.getReview(req.params.id);
      if (!review)
        res.status(404).json({ error: "review doesn't exist" });
      else
        res.json(review);
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
      await reviewsData.getReview(req.params.id);
    } catch (e) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    try {
      const movie = await reviewsData.removeReview(req.params.id);
      res.status(200).json(movie);
    } catch (e) {
      res.status(500).json({ error: e.message, e });
    }
  });

module.exports = router;