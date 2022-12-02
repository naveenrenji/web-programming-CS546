/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let palindromes = (string) => {
      if(!string) {throw 'No argument passed';}
      if( typeof string != 'string') {throw 'Argument is not a string';}
      string=string.toString()
      if(string.trim()=='') {throw 'Empty string passed';}
      string= string.toLowerCase();
      string = string.replace(/[^\w\s\']|_/g, "")
      let stringArray = string.split(' ');
      let palArray=[];
      stringArray.forEach(element=>{
            reverseArr=element.split('');
            reverseArr=reverseArr.reverse();
            let b = reverseArr.join('');
            if(element==b)
            {
                  palArray.push(element);
            }
      });
      return palArray;

};

let replaceChar = (string) => {
      if(!string) {throw 'No argument passed';}
      if( typeof string != 'string') {throw 'Argument is not a string';}
      string=string.toString()
      if(string.trim()=='') {throw 'Empty string passed';}
      let flag=1;
      let stringArray = string.split('');
      for(i=0;i<stringArray.length;i++)
      {
            if(i%2==1){
                  if(flag==1){
                        stringArray[i]='*';
                        flag=0;
                  }
                  else{
                        stringArray[i]='$';
                        flag=1;
                  }
            }
      }
      string=stringArray.join('');
      return string;
};

let charSwap = (string1, string2) => {
      if(!string1||!string2) {throw 'No argument passed';}
      if( typeof string1 != 'string'||typeof string2 != 'string') {throw 'Argument is not a string';}
      string1=string1.toString()
      string2=string2.toString()
      if(string1.trim()==''||string2.trim()=='') {throw 'Empty string passed';}
      if(string1.trim()==''||string2.trim()=='') {throw 'Empty string passed';}
      if(string1.length<4||string2.length<4) {throw "String length is less than 4";}
      let stringArray1 = string1.split('');
      let stringArray2 = string2.split('');
      for(i=0;i<4;i++)
      {
            let temp = stringArray1[i]
            stringArray1[i]=stringArray2[i];
            stringArray2[i]=temp;
      }
      string1=stringArray1.join('');
      string2=stringArray2.join('');
      return (`${string1} ${string2}`);
};


module.exports = {
      firstName: 'Naveen',
      lastName: 'Renji',
      studentId: '20016323',
      palindromes,
      replaceChar,
      charSwap
    }