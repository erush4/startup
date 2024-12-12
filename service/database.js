const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user')
const dataCollection = db.collection('data')

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});

function getUser(username) {
  return userCollection.findOne({ username: username });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(username, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

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
