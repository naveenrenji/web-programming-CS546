const express = require('express');
const router = express.Router();
const data = require('../data');
const peopleData = data.people;
const path = require('path');


router.route("/").get(async (req, res) => {
  //code here for GET
  try {
    res.sendFile(path.resolve('static/homepage.html'));
  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.route("/searchpeople").post(async (req, res) => {
  //code here for POST
  try {
    req.body.searchPersonName = checkString(req.body.searchPersonName, "Name of Person");
  } catch (e) {
    return res.status(400).render('./error', { title: "Error", message: "You have to enter a valid search parameter" });
  }
  try {
    let peopleFound = true;
    const peopleList = await peopleData.searchPeopleByName(req.body.searchPersonName);
    if (peopleList.length === 0)
      return res.render('./personNotFound', { title: "Person Not Found", searchPersonName: req.body.searchPersonName });

    res.render('./peopleFound', { peopleFound: peopleFound, people: peopleList, searchPersonName: req.body.searchPersonName, title: "People Found" });
  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.route("/persondetails/:id").get(async (req, res) => {
  //code here for GET
  try {
    req.params.id = checkId(req.params.id, "person ID");
  } catch (e) {
    return res.status(400).render('./error', { title: "Error", message: "You have to enter a valid search parameter" });
  }
  try {
    const person = await peopleData.searchPeopleByID(req.params.id);
    if (!person)
      return res.render('./personNotFound', { title: "Person Not Found", searchPersonName: req.params.id });

    res.render('./personFoundByID', { title: "Person Found", person: person });
  }
  catch (e) {
    res.status(500).json({ error: e.message });
  }
});

router.route("/persondetails/").get(async (req, res) => {
  //code here for GET
  return res.status(400).render('./error', { title: "Error", message: "You have to enter a valid search parameter" });
});


const checkId = (id, varName) => {
  if (!id) throw `Error: You must provide a ${varName}`;
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

module.exports = router;