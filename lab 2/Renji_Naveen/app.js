// /* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
// do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/
const lab2a = require('./arrayUtils');
const lab2b = require('./stringUtils');
const lab2c = require('./objectUtils');


// // arrayUtils
// // arrayStats
// console.log("\n             arrayUtils - arrayStats \n\n      Pass case-> \n")
// try{
//     //should pass
//     const a = lab2a.arrayStats([9,15,25.5, -5, 5, 7, 10, 5, 11, 30, 4,1,-20]); // Returns: { Test: 7.5, median: 7, mode: 5, range: 50, minimum: -20, maximum: 30, count: 13, sum: 97.5 }
//     console.log("Test case passed successfully \n")

// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2a.arrayStats(["guitar", 1, 3, "apple"]); // throws an error 
//     console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }


// //makeObjects

// console.log("\n             arrayUtils - makeObjects \n\n      Pass case-> \n")
// try{
//     //should pass
//     const a = lab2a.makeObjects(["foo", "bar"], [5, "John"]); // returns {foo:'bar', '5': "John"}
//     console.log("Test case passed successfully \n")

// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2a.makeObjects([1],[1,2]); // throws an error
// console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }

// //commonElements

// console.log("\n             arrayUtils - commonElements \n\n      Pass case-> \n")
// try{
//     //should pass
//     const arr5 = [67.7, 'Patrick', true]; 
// const arr6 = [true, 5, 'Patrick']; 
// const a = lab2a.commonElements(arr5,arr6); // returns ['Patrick', true]
// console.log("Test case passed successfully \n")

// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2a.commonElements([1,2,"nope"]); // throws error
// console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }

// ///stringUtils

// //palindromes

// console.log("\n             stringUtils - palindromes \n\n      Pass case-> \n")
// try{
//     //should pass
//     const a = lab2b.palindromes('Hi mom, At noon, I\'m going to take my kayak to the lake'); // Returns: ["mom", "noon", "kayak"]
// console.log("Test case passed successfully \n")
// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2b.palindromes(1);  //throws error
//  console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }


// //replaceChar

// console.log("\n             stringUtils - replaceChar \n\n      Pass case-> \n")
// try{
//     //should pass
//     const a = lab2b.replaceChar("Hello, How are you? I hope you are well"); // Returns: "H*l$o* $o* $r* $o*?$I*h$p* $o* $r* $e*l"
// console.log("Test case passed successfully \n")
// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2b.replaceChar(123); // Throws Error
// console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }


// //charSwap

// console.log("\n             stringUtils - charSwap \n\n      Pass case-> \n")
// try{
//     //should pass
//     const a = lab2b.charSwap(' four ', ' lett') //Returns "Hillick Patr"
//     console.log(a);

// console.log("Test case passed successfully \n")
// }
// catch (e) {
//     console.error('Failed test case');
// //  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2b.charSwap('hello', 'w ')  // Throws Error
//  console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully - '+e);
// }



// //objectUtils

// //deepEquality

// console.log("\n             objectUtils - deepEquality \n\n      Pass case-> \n")
try{
    //should pass
const a = lab2c.deepEquality({a: 2, b: 4}, [3,4,5]);
console.log(a);
console.log("Test case passed successfully \n")
}
catch (e) {
    console.error('Failed test case');
 }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2c.deepEquality("foo", "bar"); // throws error
// console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }


// //commonKeysValues

// console.log("\n             objectUtils - commonKeysValues \n\n      Pass case-> \n")
// try{
//     //should pass
// const first = {name: {first: "Patrick", last: "Hill"}, age: 46};
// const second = {school: "Stevens", name: {first: "Patrick", last: "Hill"}};
// const a = lab2c.commonKeysValues({name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, age: 46, hello: NaN}, {school: "Stevens", name: {first: "Patrick", last: "Hill", goodbye: [6,4,5]}, hello:NaN}); 
// console.log(a);
// console.log("Test case passed successfully \n")
// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2c.commonKeysValues("foo", "bar"); // throws error
//  console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }


//calculateObject

// console.log("\n             objectUtils - calculateObject \n\n      Pass case-> \n")
// try{
//     //should pass
//     const a = lab2c.calculateObject({a:NaN, b:true, c:'7'}, n =>n*2);
//     console.log(a);
//     /* Returns:
// {
//   a: 2.45,
//   b: 3.74,
//   c: 3.16
// }
// */
// console.log("Test case passed successfully \n")
// }
// catch (e) {
//     console.error('Failed test case');
//  }
// try{
//     //should fail
//     console.log("\n      Fail case ->\n")
//     const a = lab2c.calculateObject({ a: 3, b: 7, c: 5 }, n = n * 2); //throws error
//     console.error('Test did not error');
// } catch (e) {
//    console.log('Test failed successfully');
// }

