var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

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
			console.log(err);
			return res.render('register');
		} else {
			passport.authenticate('local')(req, res, function() {
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
	res.redirect('/campgrounds');
});

//  =======================================================

// MIDDLEWARE FOR PROTECTED PAGES
function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

module.exports = router;