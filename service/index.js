const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

app.use(express.json());

let users = {};
let data = [];

var apiRouter = express.Router();
app.use('/api', apiRouter);

//Create a new user
apiRouter.post('/auth/create', async (req, res) => {
    const user = users[req.body.email];
    if (user) {
      res.status(409).send({ msg: 'Existing user' });
    } else {
      const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
      users[user.email] = user;
  
      res.send({ token: user.token });
    }
  });

  //login user
  apiRouter.post('/auth/signin', async (req, res) => {
    const user = users[req.body.username];
    if (user) {
      if (req.body.password === user.password) {
        user.token = uuid.v4();
        res.send({ token: user.token });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

  //logout user
  apiRouter.delete('/auth/signout', (req, res) => {
    const user = Object.values(users).find((u) => u.token === req.body.token);
    if (user) {
      delete user.token;
    }
    res.status(204).end();
  });

  //get datapoints?

  apiRouter.get('/data', (_req, res) => {
    res.send(data);
  });

  // add datapoints
  apiRouter.post('/datapoint', (req, res) => {
    data.push(req.body);
  
    res.send(data);

    if (data.length > 2000) {
        data.length = 2000;
    }

  });

  //get username
