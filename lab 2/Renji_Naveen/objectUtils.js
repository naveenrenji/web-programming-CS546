/* Todo: Implment the functions below and then export them
      using the module.exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

let deepEquality = (obj1, obj2) => {
      if(!obj1||!obj2) {throw "No Object passed";}
      if(typeof obj1 !='object' || typeof obj2 !='object') {throw "Argument passed is not an object";}
      let keys1 = Object.getOwnPropertyNames(obj1);
      let keys2 = Object.getOwnPropertyNames(obj2);
      const checkObj=(obj)=>{
            return obj != null && typeof obj == 'object';
      }
      if (keys1.length != keys2.length) {
            return false;
      }
      for (let i = 0; i < keys1.length; i++) {
            let a = obj1[keys1[i]];
            let b = obj2[keys1[i]];
            if ((checkObj(a) && checkObj(b) && !deepEquality(a, b)) || (!checkObj(a) && !checkObj(b) && a !== b)) {
                    return false;
            }
      }
      return true;
};

let commonKeysValues = (obj1, obj2) => {
      if(!obj1||!obj2) {throw "No Object passed";}
      if(Array.isArray(obj1)){throw 'Array passed as argument';}
      if(Array.isArray(obj2)){throw 'Array passed as argument';}
      if(typeof obj1 !='object' || typeof obj2 !='object') {throw "Argument passed is not an object";}
      let keys = [];
      let result = {};
      const checkObj=(obj)=>{
            return obj != null && typeof obj == 'object';
      }
      let checkCommon=(obj1,obj2,keys)=>{
            for (let i = 0; i < keys.length; i++) {
                  let a = obj1[keys[i]];
                  let b = obj2[keys[i]];
                  if ((checkObj(a) && checkObj(b) && !deepEquality(a, b)) || (!checkObj(a) && !checkObj(b) && a !== b)) {
                  }
                  else{
                        result[keys[i]]=obj1[keys[i]];
                        if(checkObj(a))
                        {
                              let keysObj=[];
                              for(let i in a) {
                                    if(i in b) {
                                          keysObj.push(i);
                                    }
                              }
                              checkCommon(a,b,keysObj);
                        }
                  }
            }
      }
      for(let i in obj1) {
            if(i in obj2) {
                  keys.push(i);
            }
      }
      checkCommon(obj1,obj2,keys);
      return result;
};

let calculateObject = (object, func) => {
      if(!object) {throw "No Object passed";}
      if(!func) {throw "No function passed";}
      if(Array.isArray(object)){throw 'Array passed as argument';}
      if(typeof object !='object') {throw "Argument passed is not an object";}
      if(typeof func !='function') {throw "Argument passed is not a function";}
      let keys=Object.getOwnPropertyNames(object);
      let result ={};
      keys.forEach(key=>{
            let a = object[key];
            let b = func(a);
            let c = Math.sqrt(b);
            c=c.toFixed(2);
            result[key]=c;
      })
      return result;
};

module.exports = {
      firstName: 'Naveen',
      lastName: 'Renji',
      studentId: '20016323',
      deepEquality,
      commonKeysValues,
      calculateObject
    }