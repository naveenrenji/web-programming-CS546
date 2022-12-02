const mongoCollections = require('../config/mongoCollections');
const user_collection = mongoCollections.user_collection;
const helper = require('../helpers');
const bcrypt = require('bcryptjs');


const createUser = async (username, password) => {
  username = helper.checkUserName(username, 'username');
  password = helper.checkPassword(password, 'password');
  //bcrypt
  const hash = await bcrypt.hash(password, 16);

  let newUser = {
    username: username,
    password: hash
  };

  const userCollection = await user_collection();
  const user = await userCollection.findOne({ username: username });
  if(user){
    throw "there is already a user with that username";
  }
  const insertInfo = await userCollection.insertOne(newUser);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw 'Could not add user';

  return {userInserted: true};
};

const checkUser = async (username, password) => {
  username = helper.checkUserName(username, 'username');
  password = helper.checkPassword(password, 'password');
  const userCollection = await user_collection();
  const user = await userCollection.findOne({ username: username });
  if (user === null) throw 'Either the username or password is invalid';
  let newPassword = user.password;
  let compareToMatch = await bcrypt.compare(password, newPassword);

  if (compareToMatch) {
    return { authenticatedUser: true };
  }
  else {
    throw 'Either the username or password is invalid';
  }
};

module.exports = {
  createUser,
  checkUser
};
