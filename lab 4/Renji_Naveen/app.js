/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

const movies = require('./data/movies');
const connection = require('./config/mongoConnection');


const main = async ()=> {
try{
    await connection.dbConnection();

    let a = await movies.createMovie('    naveen','loves to code',['    sci fi', 'fiction'],'  NC-17','warner Bros.','   Pat Hill', ['  naveen mathews', ' mansi Singh'], '02/28/2022', '4h 30min' );
    console.log(a);
    const hackers = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
    const allMovies = await movies.getAllMovies();
    console.log(allMovies);
    let b = await movies.createMovie('John Legend','Suave, charming and volatile, Reggie Kray (Tom Hardy) and his unstable twin brother Ronnie start to leave their mark on the London underworld in the 1960s. Using violence to get what they want, the siblings orchestrate robberies and murders while running nightclubs and protection rackets. With police Detective Leonard "Nipper" Read hot on their heels, the brothers continue their rapid rise to power and achieve tabloid notoriety',['sci fi', 'fiction'],'  NC-17','warner Bros.','Thomas Hill', ['  naveen mathews', ' mansi Singh'], '04/11/2012', '2h 30min' );
    console.log(b);
    let id = a._id.toString()
    let c = await movies.renameMovie(id, 'Programmer');
    console.log(c);
    id= b._id.toString();
    let d = await movies.removeMovie(id);
    console.log(d);
    let newAllMovies = await movies.getAllMovies();
    console.log(newAllMovies);
}
catch(e){
    console.log(e);
}
try{
    let a = await movies.createMovie('    ','loves to code',['    sci fi', 'fiction'],'  NC-17','warner Bros.','   Pat Hill', ['  naveen mathews', ' mansi Singh'], '02/28/2022', '4h 30min' );
    console.log(a);
}
catch(e){
    console.log(e);
}
try{
    let a = await movies.removeMovie('633f48f5d6580b25694fa893');
    console.log(a);
}
catch(e){
    console.log(e);
}
try{
    let a = await movies.renameMovie('633f48f5d6580b25694fa893');
    console.log(a);
}
catch(e){
    console.log(e);
}
try{
    let a = await movies.renameMovie('633f48f5d6580b25694fa892','');
    console.log(a);
}
catch(e){
    console.log(e);
}
try{
    console.log("HEEEEEEEEEERRRRRRRREEE \N \n \n ");
    let b = await movies.createMovie('John Legend','Suave, charming and volatile, Reggie Kray (Tom Hardy) and his unstable twin brother Ronnie start to leave their mark on the London underworld in the 1960s. Using violence to get what they want, the siblings orchestrate robberies and murders while running nightclubs and protection rackets. With police Detective Leonard "Nipper" Read hot on their heels, the brothers continue their rapid rise to power and achieve tabloid notoriety',['sci fi', 'fiction'],'  NC-17','warner Bros.','Thomas Hill', ['  naveen mathews', ' mansi Singh'], '04/11/2012', '2h 30min' );
    console.log(b);
    let id = a._id.toString()
    let a = await movies.getMovieById(id);
    console.log(a);
}
catch(e){
    console.log(e);
}
try{
await connection.closeConnection();
}
catch(e){
    console.log(e);
}
}

main()