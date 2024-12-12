const cookieParser = require('cookie-parser')
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js')

// The service port may be set on the command line
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the applications static content
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
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.username);
    if (user) {
      if (await bcrypt.compare(req.body.password, user.password)) {
        setAuthCookie(res, user.token);
        res.send({ id: user._id });
        return;
      }
    }
    res.status(401).send({ msg: 'Unauthorized' });
  });

// DeleteAuth token if stored in cookie
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
  });

  //secureApiRouter verifies credentials for endpoints
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get datapoints
apiRouter.get('/data', async (req, res) =>{
    const data = await DB.getHeatData();
    res.send(data)
});

// Add datapoints
secureApiRouter.post('/datum', async (req, res) =>{
    const datum = {...req.body, ip: req.ip};
    await DB.addDatum(datum);
    const data = await DB.getHeatData();
    res.send(data);
})

// Token authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send({ msg: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    if (!token) return res.status(401).send({ msg: 'No token provided' });

    const user = Object.values(users).find(user => user.token === token);
    if (!user) return res.status(403).send({ msg: 'Invalid token' });

    req.user = user;
    next();
}

// Set anonymous (protected route)
apiRouter.post('/settings/anon', authenticateToken, (req, res) => {
    const user = req.user;
    user.anonymous = req.body.anonymous;
    res.status(204).end();
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
  app.listen(port, () => {
	console.log(`Listening on port ${port}`);
  });

// Get datapoints
apiRouter.get('/data', (_req, res) => {
    console.log('called', heatmap)
    res.send(heatmap);
});

// Add datapoints
apiRouter.post('/datapoint', (req, res) => {
    console.log('called')
    let point = req.body;
    heatPoint = {
        location: point.location,
        weight: point.value
    };
    for (let thing of data) {
        if (thing.location === heatPoint.location) {
            thing.value = heatPoint.weight;
            thing.username = point.username;
            return data;
        }
    }
    data.push(point);
    heatmap.push(heatPoint);
    res.send(heatmap);
    if (data.length > 2000) {
        data.length = 2000;
    }
    if (heatmap.length > 200) {
        heatmap.length = 200;
    }
});

// Token authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).send({ msg: 'No token provided' });

    const token = authHeader.split(' ')[1]; // Extract the token from the "Bearer <token>" format
    if (!token) return res.status(401).send({ msg: 'No token provided' });

    const user = Object.values(users).find(user => user.token === token);
    if (!user) return res.status(403).send({ msg: 'Invalid token' });

    req.user = user;
    next();
}

// Set anonymous (protected route)
apiRouter.post('/settings/anon', authenticateToken, (req, res) => {
    const user = req.user;
    user.anonymous = req.body.anonymous;
    res.status(204).end();
});