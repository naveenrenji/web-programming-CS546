const mongo = require('mongodb');


const validateMovie = (title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime) => {

  //Validating Title
  if (!title) throw 'You must provide a Title for your Movie';
  if (typeof title !== 'string') throw 'Name must be a string';
  if (title.trim().length === 0)
    throw 'Title cannot be an empty string or string with just spaces';
  title = title.trim();
  if (title.length < 2) throw 'Title must have atleast two letters'
  if (!(/^[a-z0-9A-Z\s]+$/.test(title))) throw 'Title cannot have special character or punctuations'

  // Validating plot
  if (!plot) throw 'You must provide a plot for your Movie';
  if (typeof plot !== 'string') throw 'plot must be a string';
  if (plot.trim().length === 0)
    throw 'plot cannot be an empty string or string with just spaces';
  plot = plot.trim();

  //Validating Genres
  let genreInvalidFlag = false;
  if (!genres || !Array.isArray(genres))
    throw 'You must provide an array of genres';
  if (genres.length === 0) throw 'You must supply at least one genres';
  for (i in genres) {
    if (typeof genres[i] !== 'string' || genres[i].trim().length === 0 || genres[i].length < 3 || !(/^[a-zA-Z\s]+$/.test(genres[i]))) {
      genreInvalidFlag = true;
      break;
    }
    genres[i] = genres[i].trim();
  }
  if (genreInvalidFlag)
    throw 'One or more genre is not a valid genre or is an empty string';

  //Validating Rating
  let ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  rating = rating.trim();
  let res = ratings.indexOf(rating);
  if (res === -1) throw 'You must provide valid ratings';

  //Validating Studio
  if (!studio) throw 'You must provide a studio for your Movie';
  if (typeof studio !== 'string') throw 'studio must be a string';
  if (studio.trim().length === 0)
    throw 'studio cannot be an empty string or string with just spaces';
  studio = studio.trim();
  if (studio.length < 5) throw 'studio must have atleast 5 letters'
  if (!(/^[a-zA-Z\s\p{P}]+$/gu.test(studio))) throw 'studio cannot have special character or numbers'

  //Validating Director
  if (!director) throw 'You must provide a director for your Movie';
  if (typeof director !== 'string') throw 'director must be a string';
  if (director.trim().length === 0)
    throw 'director cannot be an empty string or string with just spaces';
  director = director.trim();
  let a = director.split(' ');
  if (a.length != 2) throw 'Director name must have first and last name'
  a.forEach(element => {
    if (!(/^[a-zA-Z]+$/.test(element))) throw 'name must contain only alphabets'
    if (element.length < 3) throw 'name must have atleast 3 letters'

  });

  //castMembers
  let castMembersInvalidFlag = false;
  if (!castMembers || !Array.isArray(castMembers))
    throw 'You must provide an array of cast Members';
  if (castMembers.length === 0) throw 'You must supply at least one cast Members';
  for (i in castMembers) {
    if (typeof castMembers[i] !== 'string' || castMembers[i].trim().length === 0) {
      castMembersInvalidFlag = true;
      break;
    }
    castMembers[i] = castMembers[i].trim();
    let a = castMembers[i].split(' ');
    if (a.length != 2) throw 'cast Members name must have first and last name'
    a.forEach(element => {
      if (!(/^[a-zA-Z]+$/.test(element))) throw 'cast Members name must contain only alphabets';
      if (element.length < 3) throw 'cast Members name must have atleast 3 letters';

    });
  }
  if (castMembersInvalidFlag)
    throw 'One or more genre is not a valid genre or is an empty string';

  //Validating dateReleased
  if (!dateReleased) throw 'You must provide a release date for your Movie';
  if (typeof dateReleased !== 'string') throw 'runtime must be a string';
  if (dateReleased.trim().length === 0)
    throw 'runtime cannot be an empty string or string with just spaces';
  dateReleased = dateReleased.trim();
  if (!(/^\d{2}\/\d{2}\/\d{4}$/.test(dateReleased))) throw 'invalid date Released'
  const [month, day, year] = dateReleased.split('/');
  let y = parseInt(year);
  let m = parseInt(month);
  let d = parseInt(day);
  if (m > 12 || m < 1) throw 'Month is invalid';
  if (y < 1900) throw 'The release date is too old';
  let currentYear = new Date().getFullYear()
  if (y > currentYear + 2) throw 'too far into the future for a release date';
  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if (d > daysInMonth[m - 1]) throw 'Day does not exist in that month'

  //Validating runtime
  if (!runtime) throw 'You must provide a release date for your Movie';
  if (typeof runtime !== 'string') throw 'runtime must be a string';
  if (runtime.trim().length === 0)
    throw 'runtime cannot be an empty string or string with just spaces';
  runtime = runtime.trim();
  let runsplit = runtime.split(' ');
  if (runsplit.length != 2) throw 'runtime provided is invalid.'
  el = runsplit[0].split('');
  let len = el.length;
  if (el[len - 1] != 'h') throw 'wrong runtime format';
  if (el.length > 3 || el.length < 2) throw 'wrong runtime format';
  if (el.length == 3) {
    let first = el[0];
    let second = el[1];
    if (typeof parseInt(first) != 'number' || typeof parseInt(second) != 'number') throw ' Runtime should have valid time in hours and mins'
    let joined = first.concat(second);
    let hours = parseInt(joined);
    if (hours > 10) throw 'Movie cannot be so long.'
    if (hours < 1) throw 'Movie cannot be so short.'
  }
  else if (el.length == 2) {
    let first = el[0];
    if (typeof parseInt(first) != 'number') throw ' Runtime should have vvalid time in hours and mins'
    let hours = parseInt(first);
    if (hours > 9) throw 'Movie cannot be so long.'
    if (hours < 1) throw 'Movie cannot be so short.'
  }
  el = runsplit[1].split('');
  len = el.length;
  if (el[len - 1] != 'n' && el[len - 2] != 'i' && el[len - 3] != 'm') throw 'wrong runtime format';
  if (el.length > 5 || el.length < 4) throw 'wrong runtime format';
  if (el.length == 5) {
    let first = el[0];
    let second = el[1];
    if (typeof parseInt(first) != 'number' || typeof parseInt(second) != 'number') throw ' Runtime should have vvalid time in hours and mins'
    let joined = first.concat(second);
    let mins = parseInt(joined);
    if (mins > 59) throw 'Minutes are invalid for runtime.'
  }
  else if (el.length == 4) {
    let first = el[0];
    if (typeof parseInt(first) != 'number') throw ' Runtime should have valid time in hours and mins'
  }
};

const validateReview = (movieId, reviewTitle, reviewerName, review, rating) => {

  //Validating movieId
  movieId = checkId(movieId, "Movie Id");

  //Validating reviewTitle
  if (!reviewTitle) throw 'You must provide a Title for your Movie';
  if (typeof reviewTitle !== 'string') throw 'Name must be a string';
  if (reviewTitle.trim().length === 0)
    throw 'Title cannot be an empty string or string with just spaces';
  reviewTitle = reviewTitle.trim();
  if (reviewTitle.length < 2) throw 'Title must have atleast two letters';
  //if (!(/^[a-z0-9A-Z\s]+$/.test(reviewTitle))) throw 'Title cannot have special character or punctuations';

  //Validating reviewerName
  if (!reviewerName) throw 'You must provide a reviewerName for your Movie';
  if (typeof reviewerName !== 'string') throw 'reviewerName must be a string';
  if (reviewerName.trim().length === 0)
    throw 'reviewerName cannot be an empty string or string with just spaces';
  reviewerName = reviewerName.trim();
  let a = reviewerName.split(' ');
  if (a.length != 2) throw 'reviewerName name must have first and last name';
  a.forEach(element => {
    if (!(/^[a-zA-Z]+$/.test(element))) throw 'reviewerName must contain only alphabets';
    if (element.length < 3) throw 'reviewer first and last name must have atleast 3 letters';
  })
  //Validating review
  if (!review) throw 'You must provide a review for your review';
  if (typeof review !== 'string') throw 'review must be a string';
  if (review.trim().length === 0)
    throw 'review cannot be an empty string or string with just spaces';
  review = review.trim();

  //Validating rating
  if (!rating) throw 'You must provide a valid rating for your review';
  if (typeof rating !== 'number') throw 'rating must be a number';
  checkRating = rating * 10;
  if (!Number.isInteger(checkRating)) throw "rating is Invalid";
  if (checkRating > 50 || checkRating < 10) throw "rating is Invalid";
}

const checkId = (id, varName) => {
  if (!id) throw `Error: You must provide a ${varName}`;
  if (typeof id !== 'string') throw `Error:${varName} must be a string`;
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  if (!mongo.ObjectId.isValid(id)) throw `Error: ${varName} invalid object ID`;
  return id;
};

const checkString = (strVal, varName) => {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  if (!isNaN(strVal))
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
};

module.exports = {
  validateMovie,
  validateReview,
  checkId,
  checkString
};