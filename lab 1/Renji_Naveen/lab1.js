function questionOne(arr) {
  if(!Array.isArray(arr))
  {
    return "Wrong input!";
  }
  boolArray = [];
  arr.forEach(element => {
    result =false;
    if(element<0)
    {
      boolArray.push(false);
    }
    else if(element==0||element==1)
    {
      boolArray.push(false);
    }
    else if(element==2)
    {
      boolArray.push(true);
         }
    else
    {
      for(i=2;i<element;i++)
      {
        if(element%i==0)
        {
          boolArray.push(false);
          result=true;
          break;
        }
      }
      if(!result)
      boolArray.push(true);
  }
});
return boolArray;
  // TODO: Implement question 1 here
}

function questionTwo(startingNumber, commonRatio, numberOfTerms) {
  // TODO: Implement question 2 here
  if(startingNumber==0||commonRatio==0)
  {
    return 0;
  }
  if(numberOfTerms<0||!Number.isInteger(numberOfTerms))
  {
    return NaN;
  }
  let rPoweredToN = Math.pow(commonRatio,numberOfTerms);
  let numerator = 1-rPoweredToN;
  let denominator = 1-commonRatio;
  let sum = startingNumber*(numerator/denominator);
  return sum;
}

function questionThree(str) {
  // TODO: Implement question 3 here
let stringArray = str.split('');
let filteredArray = stringArray.filter((char)=>{
  return char.toLowerCase() != char.toUpperCase()
});
let count=0;
filteredArray.forEach(element=>{
   let tester = element.toLowerCase();
   if(!(tester=='a'||tester=='e'||tester=='i'||tester=='o'||tester=='u'))
   {
    count++;
   }
})
return count;
}

function questionFour(fullString, substring) {
  // TODO: Implement question 4 here
  let count=0;
  let len=substring.length;
  while(fullString.includes(substring))
  {
    let occ=fullString.indexOf(substring)
    let pos=occ+len;
    count++;
    fullString = fullString.slice(pos);
  }
  return count;
}

//TODO:  Change the values for firstName, lastName and studentId
module.exports = {
  firstName: 'Naveen',
  lastName: 'Renji',
  studentId: '20016323',
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
};
