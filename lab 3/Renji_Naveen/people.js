const axios = require("axios");


async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/448017f5cb43e0d590adb744e676f4b5/raw/495e09557914db5d2f40141aaef60113eb19bb41/people.json')
    return data 
  }

const getPersonById = async (id) => {
    if(!id) { throw "No Argument passed" }
    if(typeof id != 'string') { throw "Invalid Argument Type passed" }
    if(id.trim()=="") { throw "Empty spaces passed" }
    let peopleData = await getPeople();
    for(i=0;i<peopleData.length;i++){
        if(peopleData[i].id==id){
            return peopleData[i];
        }
    }
    throw "Person not found";
};

const sameJobTitle = async (jobTitle) => {
    if(!jobTitle) { throw "No Argument passed" }
    if(typeof jobTitle != 'string') { throw "Invalid Argument Type passed" }
    if(jobTitle.trim()=="") { throw "Empty spaces passed" }
    let peopleData = await getPeople();
    let result=[];
    let count = 0;
    for(i=0;i<peopleData.length;i++){
        if(peopleData[i].job_title.toLowerCase()==jobTitle.toLowerCase()){
            result.push(peopleData[i]);
            count++;
        }
    }
    if(count<2){
        throw "Not enough people with same Job Title";
    }
    return result;
};

const getPostalCodes = async (city, state) => {
    if(!city||!state) { throw "No Argument passed" }
    if(typeof city != 'string'||typeof state != 'string') { throw "Invalid Argument Type passed" }
    if(city.trim()==""||state.trim()=="") { throw "Empty spaces passed" }
    let peopleData = await getPeople();
    let result=[];
    let count = 0;
    for(i=0;i<peopleData.length;i++){
        if(peopleData[i].state.toLowerCase()==state.toLowerCase()){
            if(peopleData[i].city.toLowerCase()==city.toLowerCase()){
                result.push(parseInt(peopleData[i].postal_code));
                count++;
            }
        }
    }
    if(count==0){
        throw "No person in that city and state or no postal code available";
    }
    return result.sort();
};

const sameCityAndState = async (city, state) => {
    if(!city||!state) { throw "No Argument passed" }
    if(typeof city != 'string'||typeof state != 'string') { throw "Invalid Argument Type passed" }
    if(city.trim()==""||state.trim()=="") { throw "Empty spaces passed" }
    let peopleData = await getPeople();
    let result=[];
    let count = 0;
    for(i=0;i<peopleData.length;i++){
        if(peopleData[i].state.toLowerCase()==state.toLowerCase()){
            if(peopleData[i].city.toLowerCase()==city.toLowerCase()){
                let res = [];
                res[0]=peopleData[i].first_name;
                res[1]=peopleData[i].last_name;
                result.push(res);
                count++;
            }
        }
    }
    if(count<2){
        throw "Not enough people in that city and state";
    }
    // fund below in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
    result.sort((a,b)=> {   
        if(a[1]<b[1]){
            return -1;
        } 
        else if(a[1]>b[1]){
            return 1;
        }
        else if(a[1]===b[1])
        {
            return 0;
        }
    });
    finalResult=[];
    result.forEach((element)=>{
        element=element[0]+" "+element[1];
        finalResult.push(element);
    } )
    return finalResult;
};

module.exports = {
    firstName: 'Naveen',
    lastName: 'Renji',
    studentId: '20016323',
    getPeople,
    getPersonById,
    sameJobTitle,
    getPostalCodes,
    sameCityAndState
};
