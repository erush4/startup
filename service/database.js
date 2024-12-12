const { MongoClient } = require('mongodb');
const bcryptjs = require('bcryptjs');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);

let db, userCollection, dataCollection;

(async function testConnection() {
  try {
    await client.connect();
    db = client.db('startup');
    userCollection = db.collection('user');
    dataCollection = db.collection('data');
    await db.command({ ping: 1 });
    console.log("Connected successfully to database");
  } catch (ex) {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  }
})();

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcryptjs.hash(password, 10);

  const user = {
    username: username,
    password: passwordHash,
    anonymous: false,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addDatum(point){
  return dataCollection.insertOne(point);
}

function getHeatData() {
  const projection = {location: 1, weight: 1};
  const cursor = dataCollection.find({}, {projection});
  return cursor.toArray();
}

function getAnonymous(userId) {
  query = {userId: userId};
  const projection = {anonymous: 1};
  const anonymous = userCollection.find(query, {projection});
  return anonymous;
}

async function setAnonymous(userId, newState) {
  query= {userId: userId};
  const update = { $set: {anonymous: newState}};
  const result = await userCollection.updateOne(query, update);
  return result;
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getHeatData,
  addDatum,
  getAnonymous,
  setAnonymous
};
