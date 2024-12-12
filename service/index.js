const cookieParser = require('cookie-parser');
const express = require('express');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const app = express();
const DB = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 3000;
app.use(express.json());
app.use(cookieParser());

// Serve up the application's static content
app.use(express.static('public'));

// Trust headers that are forwarded from the proxy so we can determine IP addresses
app.set('trust proxy', true);

const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.username)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.username, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/signin', async (req, res) => {
  const user = await DB.getUser(req.body.username);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ message: 'Unauthorized' });
});

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/signout', (_req, res) => {
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    req.user = user;
    next();
  } else {
    res.status(401).send({ message: 'Unauthorized' });
  }
});

// Get datapoints
apiRouter.get('/data', async (req, res, next) => {
    const data = await DB.getHeatData();
    res.send(data);
});

// Add datapoints
secureApiRouter.post('/datum', async (req, res, next) => {

    const datum = { ...req.body, ip: req.ip };
    await DB.addDatum(datum);
    const data = await DB.getHeatData();
    res.send(data);
});
// Get settings (anonymous is the only one)
secureApiRouter.get('/settings', async (req, res, next) => {
    const userId = req.user._id;
    const settings = await DB.getAnonymous(userId);
    console.log(settings)
    res.send(settings);
});

// Set settings
secureApiRouter.put('/user/settings', async (req, res, next) => {
    const userId = req.user._id;
    const newState = req.body.settings;
    const result = await DB.setAnonymous(userId, newState);
    if (result.modifiedCount > 0) {
      res.send({ message: 'Settings updated successfully' });
    } else {
      res.status(400).send({ message: 'Failed to update settings' });
    }
});

// Default error handler
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
