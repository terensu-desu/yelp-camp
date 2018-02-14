var express = require('express');
var router = express.Router({mergeParams: true});
var Campground = require('../models/campground');
var Comment = require('../models/comment');

// NEW - comments
router.get('/new', isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/new', {data: campground});
		}
	});
});

// CREATE - comments
router.post('/', isLoggedIn, function(req, res) {
	// First find the campground by ID
	Campground.findById(req.params.id, function(err, campground) {
		if(err) {
			console.log(err);
			res.redirect('/campgrounds');
		} else {
			Comment.create(req.body.comment, function(err, newComment) {
				if(err) {
					console.log(err);
				} else {
					// can use req.user due to this being a protected route and we know the user info will be there
					newComment.author.username = req.user.username;
					newComment.author._id = req.user._id;
					newComment.save();
					campground.comments.push(newComment);
					campground.save();
					res.redirect('/campgrounds/' + campground._id);
				}
			});
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