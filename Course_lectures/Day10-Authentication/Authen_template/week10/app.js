var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var db = require('./db');
var User = require('./models/user');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function (req, res) {
  res.render('login'); // load the login page
});


passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id)
  .then(user => done(null, user))
  .catch(err => done(err, null));
})

// Passport configuration
passport.use(new FacebookStrategy({
    clientID: "YOUR_FACEBOOK_APP_ID_HERE",
    clientSecret: "YOUR_FACEBOOK_SECRET_ID_HERE",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    const authId = 'facebook:' + profile.id;
    User.findOne({ 'authId': authId })
      .then(user => {
        if(user) return done(null, user);
        new User({
          authId: authId,
          name: profile.displayName,
          created: new Date(),
          role: 'student',
        }).save()
        .then(user => done(null, user))
        .catch(err => done(err, null));
      })
      .catch(err => {
        if(err) return done(err, null);
      });
  }
));

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/dashboard',
                                      failureRedirect: '/login' }));
                                      
app.get('/dashboard', isLoggedIn, function (req, res) {
  res.render('dashboard', {
    user: req.user // get the user out of session and pass to template
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
}

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/login');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
