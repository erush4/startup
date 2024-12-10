const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.json());

let users = {};
let data = [];

var apiRouter = express.Router();
app.use('/api', apiRouter);

//Create a new user