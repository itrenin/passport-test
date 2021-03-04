var express = require('express')
const passport = require('passport')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login-form', { title: 'Auth test' })
})
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send('Неправильный логин и пароль.')
    }
    req.login(user, (err) => {
      return res.send('Маладэс! Пароль и логин те самые.')
    })
  })(req, res, next)
})

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Вы прошли аутентификацию и находитесь на закрытой странице')
  } else res.status(403).send('Доступ запрещен')
})

router.get('/signout', (req, res) =>{
    req.logout()
    res.redirect('/')
})

module.exports = router