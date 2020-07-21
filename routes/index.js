const express = require('express');
const router  = express.Router();
const upload  = require('../upload');
const Photo   = require('../models/photos');

router.get('/',(req,res)=>{

	Photo.find({},(error,images)=>{
		if(error){
			console.log(error);
		}else{
			res.render('index',{images:images, msg: req.query.msg});
		}
	});

});

router.post('/upload',(req,res)=>{

	upload(req,res,(err) =>{
		if(err){
			res.redirect(`/?msg=${err}`);
		}else if(req.file === undefined){
			res.redirect('/?msg=Error: No file selected');
		}else{
			let uploadedPhoto = new Photo({
				name: req.file.filename,
				path: 'images/'+req.file.filename,
				size: req.file.size
			}).save();
			res.redirect('/?msg=File uploaded successfully');
		}
	});

});

module.exports = router;