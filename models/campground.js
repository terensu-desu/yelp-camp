var mongoose = require('mongoose');

var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String,
	price: String,
	author: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId, //Points to _id of object
			ref: "Comment" //Name of the model
		}
	]
});

module.exports = mongoose.model("Campground", campgroundSchema);