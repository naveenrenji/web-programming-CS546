const lab1 = require('./lab1');

// TODO: Write and call each function in lab1.js 5 times each, passing in different input
console.log("\nQuestion One \n"); 

console.log(lab1.questionOne([5, 3, 10]));  // Returns and then outputs [true, true, false]
console.log(lab1.questionOne([2, 1, 2])); // Returns and then outputs[true, false, true] 
console.log(lab1.questionOne([512, 1007, 17389])); //Returns and then outputs [false, false, true]
console.log(lab1.questionOne([0, 14159, 785])); //Returns and then outputs [false, true, false]
console.log(lab1.questionOne([11, 4])); //Returns and then outputs [true, false]

console.log("\nQuestion Two \n");

console.log(lab1.questionTwo(5, 3, 10));  // Returns and then outputs 147620 
console.log(lab1.questionTwo(2, 0, 2)); // Returns and then outputs 0 
console.log(lab1.questionTwo(512, 1007, -5)); //Returns and then outputs NaN
console.log(lab1.questionTwo(2, 10, 4)); //Returns and then outputs 2222
console.log(lab1.questionTwo(175, 3, 5)); //Returns and then outputs 21175 

console.log("\nQuestion Three \n"); 

console.log(lab1.questionThree("How now brown cow"));  // Returns and then outputs 10
console.log(lab1.questionThree("Welcome to CS-546")); // Returns and then outputs 7 
console.log(lab1.questionThree("JavaScript is fun!")); //Returns and then outputs 10
console.log(lab1.questionThree("My name is Naveen Renji!")); //Returns and then outputs 11
console.log(lab1.questionThree("SpaceX is 10/10 revolutionary")); //Returns and then outputs 12
console.log(lab1.questionThree("One frog jumped into the water."));

console.log("\nQuestion Four \n");  // Returns and then outputs [true, true, false]

console.log(lab1.questionFour("hello world", "o"));  // Returns and then outputs 2
console.log(lab1.questionFour("Helllllllo, class!", "ll")); // Returns and then outputs 3 
console.log(lab1.questionFour("aaaaa", "aa")); // Returns and then outputs 2
console.log(lab1.questionFour("welcome to mississippi", "is")); // Returns and then outputs 2
console.log(lab1.questionFour("malayalam is a difficult language", "la")); // Returns and then outputs 3 

