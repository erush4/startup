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
	const existingUser = users[req.body.username];
	if (existingUser) {
		res.status(409).send({ msg: 'Username already exists!' });
	} else {
		const newUser = { username: req.body.username, password: req.body.password, anonymous: false, token: uuid.v4() };
		users[newUser.username] = newUser;
		res.send({ token: newUser.token });
	} 
});

//login user
apiRouter.post('/auth/signin', async (req, res) => {
	const user = users[req.body.username];
	if (user) {
		if (req.body.password === user.password) {
			user.token = uuid.v4();
			res.send({ token: user.token, anonymous: user.anonymous});
			return;
		}		
	}
	res.status(401).send({ msg: 'Incorrect username or password' });
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

