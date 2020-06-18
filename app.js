require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')

const choreRoutes = require('./api/routes/chores')
const userRoutes = require('./api/routes/users')

// Passport Config
require('./api/config/passport')(passport)

// Connect to Mongo
mongoose.connect(
	'mongodb+srv://admin:' +
		process.env.MONGO_ATLAS_PW +
		'@cluster0-fmgri.mongodb.net/test?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	}
)

// EJS
app.use(express.static('public'))
app.set('view engine', 'ejs')

// Config
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Express Session
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
	})
)

// Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect Flash
app.use(flash())

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg')
	res.locals.error_msg = req.flash('error_msg')
	res.locals.error = req.flash('error')
	next()
})

// Set headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	)
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
		return res.status(200).json({})
	}
	next()
})

// Routes to handle requests
app.use('/', choreRoutes)
app.use('/chores', choreRoutes)
app.use('/user', userRoutes)

// Handle 404
app.use((req, res, next) => {
	const error = new Error('Not found')
	error.status(404)
	next(error)
})

// Handle other errors
app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message,
		},
	})
})

module.exports = app
