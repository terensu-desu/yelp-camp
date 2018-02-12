var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var request = require('request'); // maybe unnecessary

var app = express();
mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");
var port = process.env.PORT || 3001;

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
});

var Campground = mongoose.model("Campground", campgroundSchema);
// END SCHEMA SETUP

/*Campground.create({
	name: "Mountain Goat's Rest",
	image: "https://farm4.staticflickr.com/3613/3322478995_b62f47fc10_b.jpg",
	description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos alias consequuntur commodi, labore, quibusdam iusto modi sunt reiciendis, voluptas possimus provident corporis est asperiores nam ea voluptate cumque exercitationem optio."
}, function(err, res) {
		if(err) {
			console.log(err);
		} else {
			console.log("New campground added");
			console.log(res);
		}
	}
);*/

/*var campgrounds = [
	{
		name: "Salmon Creek",
		image: "https://farm8.staticflickr.com/7512/16244382755_9d879de497_k.jpg"
	},
	{
		name: "Lake Biwa",
		image: "https://farm5.staticflickr.com/4134/4750172436_c88d9f69ce_b.jpg"
	},
	{
		name: "Mountain Goat's Rest",
		image: "https://farm4.staticflickr.com/3613/3322478995_b62f47fc10_b.jpg"
	}
];*/

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/campgrounds', function(req, res) {
	Campground.find({}, function(err, campgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render('campgrounds', {data: campgrounds})
		}
	});
});

app.post('/campgrounds', function(req, res) {
	var newCampground = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description
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

app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

app.get('/campgrounds/:id', function(req, res) {
	Campground.findById(req.params.id, function(err, foundCampground) {
		if(err) {
			console.log(err);
		} else {
			res.render('show', {data: foundCampground});
		}
	});
});

app.listen(port, function() {
	console.log("Yelp Camp is now running and listening on port: " + port);
});