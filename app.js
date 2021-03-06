require('dotenv').config()
const user = require('./mock/user')
var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const secret = process.env.secret
const helmet = require('helmet')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var authRouter = require('./routes/authRouter')

// initialization of app
var app = express()
app.use(helmet())

// passport sessions
app.use(
  session({
    store: new FileStore(),
    secret: secret,
    resave: false,
    saveUninitialized: true,
  })
)

app.use(passport.initialize())
app.use(passport.session())

// passport serialize
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// passport deserialize
passport.deserializeUser((id, done) => {
  const _user = user.id === id ? user : false
  done(null, _user)
})

//passport LocalStrategy
console.log(user)
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    (email, password, done) => {
      if (email === user.email && password === user.password) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    }
  )
)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
