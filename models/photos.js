const mongoose = require('mongoose');

var photoSchema = new mongoose.Schema({
	name: String,
	path: String,
	size: Number,
	date: {type: Date, default: Date()}
});

module.exports = mongoose.model('Photo',photoSchema);