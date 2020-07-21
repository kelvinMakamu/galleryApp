//Imports
const express = require('express');
const mongoose  = require('mongoose');
const upload  = require('./upload');
//Routes
let indexRouter = require('./routes/index');
let imageRouter = require('./routes/image');
// Initialize Express
const app  = express();

//DB Creds
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

let mongoUrl = 'mongodb://localhost/darkroom';
mongoose.connect(mongoUrl,options);
let db = mongoose.connection;

db.once('open',()=>{
	console.log("Database connected successfully.");
});

db.on('error',(error)=>{
	console.log(error);
});

//Set View Engine
app.set('view engine','ejs');
//Set Static folder
app.use(express.static('public'));
// body parser middleware
app.use(express.json());
// App Routing
app.use('/', indexRouter);
app.use('/image', imageRouter);
//Server PORT
const PORT = process.env.PORT || 5000;
//Start Server
app.listen(PORT, function(){
	console.log(`Server is listening on port ${PORT}`);
});