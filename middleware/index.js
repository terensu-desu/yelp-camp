var middlewareObj = {};
var Campground = require('../models/campground');
var Comment = require('../models/comment');

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}

	req.flash('danger', 'Please login first.'); // will only render when the next redirect/ page render
	//so it's basically charged and ready to go for res.redirect('/login')
	res.redirect('/login');
}

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	//check if user is logged in (authentication)
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCampground) {
			if(err || !foundCampground) {
				// error finding campground
				req.flash('danger', 'Oops! That campground does not exist! Sorry!');
				res.redirect('/campgrounds');
			} else {
				// check if foundCampground.author matches the current user (authorization)
				if(foundCampground.author.id.equals(req.user._id)) {
					next();
				} else {
					//no? send them back
					req.flash('danger', 'Authorization error.');
					res.redirect('back');
				}
			}
		});
	} else {
		// user is not logged in
		req.flash('danger', 'Please login first.');
		res.redirect('/login');
	}
}

middlewareObj.checkCommentOwnership = function(req, res, next) {
	//check if user is logged in (authentication)
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err || !foundComment) {
				// error finding comment
				req.flash('danger', 'Oops! That comment does not exist! Sorry!');
				res.redirect('back');
			} else {
				// check if foundComment.author matches the current user (authorization)
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					//no? send them back
					req.flash('danger', 'Authorization error.');
					res.redirect('back');
				}
			}
		});
	} else {
		// user is not logged in
		req.flash('danger', 'Please login first.');
		res.redirect('/login');
	}
}

module.exports = middlewareObj;