const axios = require("axios");

//Axios call to get all data
const getAllPeople = async () => {
  const { data } = await axios.get('https://gist.githubusercontent.com/robherley/5112d73f5c69a632ef3ae9b7b3073f78/raw/24a7e1453e65a26a8aa12cd0fb266ed9679816aa/people.json');
  return data;
};

//Function to list of up to 20 people matching the searchPersonName (sorted by id)
const searchPeopleByName = async (searchPersonName) => {
  searchPersonName = checkString(searchPersonName, "Name of Person");
  searchPersonName = searchPersonName.toLowerCase();
  const allPeople = await getAllPeople();
  let a = [];
  let count = 0;
  for (i = 0; i < allPeople.length && count < 20; i++) {
    let firstName = allPeople[i].firstName.toLowerCase();
    let lastName = allPeople[i].lastName.toLowerCase();
    if ((firstName.indexOf(searchPersonName) !== -1) || (lastName.indexOf(searchPersonName) !== -1)) {
      count++;
      a[count] = {
        id: allPeople[i].id,
        firstName: allPeople[i].firstName,
        lastName: allPeople[i].lastName
      }
    }
  }
  return a;
};

//Function to list person matching the id
const searchPeopleByID = async (id) => {
  id = checkId(id, "person ID");
  const allPeople = await getAllPeople();
  let a = allPeople.find(obj => obj.id === parseInt(id));
  return a;
};

module.exports = { getAllPeople, searchPeopleByName, searchPeopleByID };



const checkId = (id, varName) => {
  if (!id) throw `Error: You must provide a ${varName}`;
  id = id.toString();
  id = id.trim();
  if (id.length === 0)
    throw `Error: ${varName} cannot be an empty string or just spaces`;
  id = parseInt(id);
  if (typeof id !== 'number') throw  'Error: ${varName} must be a number';
  if(isNaN(id)) throw 'Error: ${varName} must be a number';
  return id;
};

const checkString = (strVal, varName) => {
  if (!strVal) throw `Error: You must supply a ${varName}!`;
  if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
  strVal = strVal.trim();
  if (strVal.length === 0)
    throw `Error: ${varName} cannot be an empty string or string with just spaces`;
  if (!(/^[a-zA-Z\s]+$/.test(strVal)))
    throw `Error: ${varName} cannot have special character or punctuations or numbers`;
  if (!isNaN(strVal))
    throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
  return strVal;
};