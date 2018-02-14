var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// GET (All)
router.get('/', function(req, res) {	
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', {data: campgrounds});
		}
	});
});

// CREATE
router.post('/', isLoggedIn, function(req, res) {
	var newCampground = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		author: {
			id: req.user._id,
			username: req.user.username
		}
	};
	Campground.create(newCampground, function(err, newCampground) {
		if(err) {
			console.log(err);
		} else {
			console.log("New Campground added");
			res.redirect('/campgrounds');
		}
	});
});

// NEW
router.get('/new', isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

// SHOW
router.get('/:id', function(req, res) {
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			res.render('campgrounds/show', {data: foundCampground});
		}
	});
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