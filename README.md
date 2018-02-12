# Yelp Campground Project
Working alongside Colt Steele's Web Developer Bootcamp Udemy course, I'm building a Yelp-like application using Node.js, Express, and Mongo with Mongoose.

While I have dabbled with some Node.js tutorials before, they tend to go quickly and don't always explain things in depth. That's understandable, I do read more on my own as well. However, just to make sure I haven't missed anything, I wanted to go along with Steele's course to solidify my understanding of Node based projects before starting on my own. I've sped along through this project thanks to my previous experience.

The templating engine is EJS, Embedded JavaScript, which is not my favorite. I've used Handlebars before, which felt very comfortable and easy to use.

Eventually, this will incorporate a few other packages, including passport for authentication.

### Terminal Commands Reference
sudo service mongod start

cd /usr/ && ./bin/mongo


#### RESTFUL Route Guide

name			url					verb		description
===========================================
INDEX			/dogs				GET			Display a list of all dogs
NEW				/dogs/new		GET			Display a form to make a new dog
CREATE 		/dogs				POST		Add a new dog to DB
SHOW			/dogs/:id		GET			Show info about one dog