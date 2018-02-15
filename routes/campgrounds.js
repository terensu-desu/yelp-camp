var express = require('express');
var router = express.Router();
var Campground = require('../models/campground');
var Comment = require('../models/comment');
var middleware = require('../middleware');

var { isLoggedIn, checkCampgroundOwnership } = middleware;

// GET (All)
router.get('/', function(req, res) {	
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render('campgrounds/index', {campgrounds: campgrounds});
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
			req.flash('danger', 'There was an error during the request.');
			res.redirect('back');
		} else {
			req.flash('success', 'New campground added!');
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
			req.flash('success', 'New campground added!');
			res.redirect('back');
		} else {
			res.render('campgrounds/show', {campground: foundCampground});
		}
	});
});

// EDIT CAMPGROUND
router.get('/:id/edit', checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			req.flash('danger', 'There was an error.');
			res.redirect('/campgrounds');
		} else {
			res.render('campgrounds/edit', {campground: foundCampground});
		}
	});
});

// UPDATE CAMPGROUND
router.put('/:id', checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground) {
		if(err) {
			req.flash('danger', 'There was an error.');
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground updated!');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

// DESTROY CAMPGROUND
router.delete('/:id', checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			req.flash('danger', 'There was an error.');
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground deleted!');
			res.redirect('/campgrounds');
		}
	});
});

module.exports = router;