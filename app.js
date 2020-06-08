const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const choreRoutes = require('./api/routes/chores');
const userRoutes = require('./api/routes/users');

mongoose.connect(
	'mongodb+srv://admin:' +
		process.env.MONGO_ATLAS_PW +
		'@cluster0-fmgri.mongodb.net/test?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

// Routes to handle requests
app.use('/', choreRoutes);
app.use('/chores', choreRoutes);
app.use('/user', userRoutes);

// Handle 404
app.use((req, res, next) => {
	const error = new Error('Not found');
	error.status(404);
	next(error);
});

// Handle other errors
app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error: {
			message: error.message,
		},
	});
});

module.exports = app;
