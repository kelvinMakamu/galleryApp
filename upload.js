//Imports
const multer = require('multer');
const path   = require('path');

//Storage Engine
const storage = multer.diskStorage({
	destination: './public/images/',
	filename: function(req,file,cb){
		cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
	}
});

//Initialize Upload
const upload = multer({
	storage:storage,
	limits:{fileSize:1000000},
	fileFilter: function (req,file,cb){
		let fileTypes =/jpg|jpeg|png|gif/;
		let extname	  = fileTypes.test(path.extname(file.originalname).toLowerCase());
		let mimetype  = fileTypes.test(file.mimetype);
		if(mimetype && extname){
			cb(null,true);
		}else{
			cb('Please upload images ONLY!!!');
		}
	}
}).single('image');

module.exports = upload;