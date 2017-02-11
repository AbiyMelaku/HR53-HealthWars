var app = require('./route');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./dbmodules/users/userModel.js');




var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port', port);
});

mongoose.connect('mongodb://localhost/healthwars');

// parse requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//=========configure authentication=========/
var session = require('express-session');
var passport = require('passport');
require('../fbAuth.js')(passport);
app.use(session({
  secret: 'kenny',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

//=========authentication route=========/
app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: "/"
}), function (req, res) {
  // passport attaches user information to all incoming requests
  if (!req.user.goal) {
    // if user has no goal, allow them to create one
    res.redirect('/#/overview');
  } else {
    // else log user in and redirect to goal status page
    res.redirect('/#/overview');
  }
});

app.get('/logout', function (req, res) {
  // passport attaches logout method to all requests
  console.log('BLAAHHH req.body', req)
  User.findById(req.body._id, function(err, user) {
    console.log('USER HERE THERE EVERYWHERE', user);
  });
  res.redirect('/');
});

//============ route middleware to make sure a user is logged in =============/
function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();
    // if they aren't redirect them to the home page
    res.redirect('/');
}