var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local');
var flash = require('connect-flash');
var Campground = require('./models/campground');
var Comment = require('./models/comment');
var User = require('./models/user');
var campgroundRoutes = require('./routes/campgrounds');
var commentRoutes = require('./routes/comments');
var indexRoutes = require('./routes/index');
var seedDB = require('./seeder/seeds.js');

var app = express();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
var port = process.env.PORT || 3001;
//seedDB();

// PASSPORT CONFIG
app.use(require('express-session')({
	secret: "Farz is the best",
	resave: false, // required
	saveUninitialized: false // required
}));


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); // Comes from passport-local-mongoose, same with next two
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.message = req.flash();
	next();
});
app.use(indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

//  =======================================================

app.listen(port, function() {
	console.log("Yelp Camp is now running and listening on port: " + port);
});