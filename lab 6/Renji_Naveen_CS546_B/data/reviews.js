const helpers = require('../helpers');
const mongo = require('mongodb');
const moviesData = require('./movies');
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;

const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {
  helpers.validateReview(
    movieId,
    reviewTitle,
    reviewerName,
    review,
    rating
  );

  let newReview = {
    reviewTitle,
    reviewerName,
    review,
    rating
  };

  let date = new Date();
  let month = date.getMonth();
  let day = date.getDate();
  let year = date.getFullYear();
  month = month + 1;
  if (month < 10)
    month = '0' + month;
  if (day < 10)
    day = '0' + day;
  let dateFormat = month + '/' + day + '/' + year;

  newReview._id = mongo.ObjectId();
  newReview.reviewTitle = reviewTitle;
  newReview.reviewDate = dateFormat;
  newReview.reviewerName = reviewerName;
  newReview.review = review;
  newReview.rating = rating;
  const movieCollection = await movies();
  let insertInfo = await movieCollection.updateOne({
    "_id": mongo.ObjectId(movieId)
  },
    {
      "$push": {
        "reviews": {
          "_id": mongo.ObjectId(newReview._id),
          "reviewTitle": newReview.reviewTitle,
          "reviewDate": newReview.reviewDate,
          "reviewerName": newReview.reviewerName,
          "review": newReview.review,
          "rating": newReview.rating,
        }
      }
    })
  if (!insertInfo.acknowledged || !insertInfo.modifiedCount)
    throw 'Could not add review to movie';
  let newOverallRating = await calculateOverallRating(movieId)
  insertInfo = await movieCollection.updateOne({ _id: mongo.ObjectId(movieId) }, { $set: { overallRating: newOverallRating } })
  if (!insertInfo.acknowledged)
    throw 'Could not update overallRating to movie';
  return newReview;
};

const getAllReviews = async (movieId) => {
  let id = helpers.checkId(movieId, "Movie Id");
  let movie = await moviesData.getMovieById(id)
  reviews = movie.reviews;
  if (!reviews)
    return [];
  else
    return reviews;

};

const getReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId, "Review Id");
  let rev;
  let moviesArray = await moviesData.getAllMovies();
  moviesArray.forEach(element => {
    element.reviews.forEach(movieReview => {
      if (movieReview._id.toString() == reviewId)
        rev = movieReview;
    })
  });
  return rev;
};

const removeReview = async (reviewId) => {
  reviewId = helpers.checkId(reviewId, "Review Id");
  let movieId;
  let rating;
  let moviesArray = await moviesData.getAllMovies();
  moviesArray.forEach(element => {
    element.reviews.forEach(movieReview => {
      if (movieReview._id.toString() == reviewId)
        movieId = element._id;
      rating = movieReview.rating;
    })
  });
  if (!movieId) throw "ReviewId does not exist";
  getmovie = await moviesData.getMovieById(movieId);
  const movieCollection = await movies();
  let insertInfo = await movieCollection.updateOne({
    "_id": mongo.ObjectId(movieId),
  },
    {
      "$pull": {
        "reviews": {
          "_id": mongo.ObjectId(reviewId)
        }
      }
    });
  if (!insertInfo.acknowledged || !insertInfo.modifiedCount)
    throw 'Could not remove review from movie';
  let newOverallRating = await calculateOverallRating(movieId)
  insertInfo = await movieCollection.updateOne({ _id: mongo.ObjectId(movieId) }, { $set: { overallRating: newOverallRating } })
  if (!insertInfo.acknowledged)
    throw 'Could not update overallRating to movie';
  let a = await moviesData.getMovieById(movieId);
  return a;
};


const calculateOverallRating = async (movieId) => {
  let movie = await moviesData.getMovieById(movieId);
  let average = 0;
  let sum = 0;
  let count = 0
  movie.reviews.forEach(element => {
    sum = sum + element.rating;
    count = count + 1;
  });
  if(count===0) return 0;
  average = sum / count;
  average = Math.round(average * 10) / 10
  return average;
}
module.exports = {
  createReview,
  getAllReviews,
  getReview,
  removeReview
};
