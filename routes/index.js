var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var middleware = require('../middleware');

var { isLoggedIn } = middleware;

// ROOT - Or landing.. whatever, he wants to keep this one around.
router.get('/', function(req, res) {
	res.render('root');
});

// AUTH ROUTES
// GET REGISTER PAGE
router.get('/register', function(req, res) {
	res.render('register');
});

// CREATE USER
router.post('/register', function(req, res) {
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user) {
		if(err) {
			req.flash('danger', err.message);
			return res.render('register');
		} else {
			passport.authenticate('local')(req, res, function() {
				req.flash('success', 'Welcome to Yelp Campgrounds, ' + user.username + '!')
				res.redirect('/campgrounds');
			});
		}
	});
});

// SHOW LOGIN FORM
router.get('/login', function(req, res) {
	res.render('login');
});

// HANDLE LOGIN LOGIC
		// Use middleware from passport to authenticate input from user
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/campgrounds',
		failureRedirect: '/login'
	})
);

// HANDLE LOGOUT
router.get('/logout', function(req, res) {
	req.logout();
	req.flash('success', 'Logged you out!');
	res.redirect('/campgrounds');
});

module.exports = router;