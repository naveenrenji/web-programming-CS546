/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let arrayStats = (arr) =>
{
  //Input validation
  if(!arr){throw 'No argument passed';}
  if(!Array.isArray(arr)){ throw "Parameter is not an array"; }
  if(arr.length==0){throw 'array is empty';}
  arr.forEach(element => {
    if(typeof element != 'number') {throw 'Array element is not a number';}
  });
  //Mean
  arr.sort(function(a, b){return a-b});
  let stats = {}
  let sum=0;
  let numberOfNums=0;
  arr.forEach(element=>{
    sum+=element;
    numberOfNums++;
  })
  stats.sum=sum;
  stats.count=numberOfNums;
  stats.mean=sum/arr.length;
  //Median
  if(arr.length%2==1)
  {
    let half = (arr.length-1)/2;
    stats.median = arr[half];
  }
  else{
    let half = arr.length/2;
    stats.median=(arr[half-1]+arr[half])/2;
  }
  //Mode
  let count={};
  arr.forEach(element=>{
    if(count[element]==undefined)
    {
      count[element]=0;
    }
    else
    {
      count[element]+=1;
    }
  })
  let max=-1;
  let mode = [];
  let keys = Object.keys(count);
  for(i=0;i<keys.length;i++)
  {
    if(count[keys[i]]>max)
    {
      max=count[keys[i]];
    }
  }
  if(max!=0)
  {
  for(i=0;i<keys.length;i++)
  {   
    if(count[keys[i]]==max)
    {
      mode.push(parseInt(keys[i]));
    }
  }
}
  if(mode.length==0)
  {
    stats.mode=0;
  }
  else if(mode.length==1)
  {
    stats.mode=mode[0];
  }
  else{
    stats.mode=mode.sort(function(a, b){return a-b});
  }
  //Range
  stats.min=arr[0];
  stats.max=arr[arr.length-1]
  stats.range=stats.max-stats.min;

  return stats;
};

let makeObjects = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays.length==0) {throw 'No argument passed';}
  arrays.forEach(element=>{
    if(!element) {throw 'No argument passed';}
    if(!Array.isArray(element)){throw "Parameter is not an array";}
    else if(element.length==0) { throw 'empty array passed'; }
    else if(element.length!=2){ throw 'Array size is not equal to 2'; }
  })
  let madeObject={};
  arrays.forEach(element=>{
    madeObject[element[0]]=element[1];
  })
  return madeObject;
};

let commonElements = (...arrays) => {
  //this function takes in a variable number of arrays that's what the ...arrays signifies
  if(arrays.length==0) {throw 'No argument passed';}
  arrays.forEach(element=>{
    if(!element) {throw 'No argument passed';}
    if(!Array.isArray(element)){throw "Parameter is not an array";}
    else if(element.length==0) { throw 'empty array passed'; }
  })
  if(arrays.length<2) {throw 'less than 2 array argument passed';}
  let flag=0;
  let arrayFlag=0;
  let common=[];
  let arrayItem = undefined;
  let element=arrays[0];
  for(j=0;j<element.length;j++)
    {
      let item=element[j];
      if(Array.isArray(item))
      {
        arrayItem=item;
        item = item.join();
        arrayFlag =1;

      } 
      for(k=1;k<arrays.length;k++)
      {
        if(arrayFlag==1)
        {
          arrays[k].forEach(element=>{
            if(Array.isArray(element))
              {
                let a=element.join();
                if(a==item)
                {
                  flag=1;
                }
              }
          })
        }
        else{
          if(arrays[k].includes(item))
          {
            flag = 1;
          }
          else
          { 
            flag = 0; 
            break;
          }
        } 

      }
      if(arrayFlag)
      {
        common.push(arrayItem);
        arrayFlag=0;
      }
      else if(flag==1)
      {
        common.push(item);
      }
      flag=0;
     }
  return common;
};
  


module.exports = {
  firstName: 'Naveen',
  lastName: 'Renji',
  studentId: '20016323',
  arrayStats,
  makeObjects,
  commonElements
}