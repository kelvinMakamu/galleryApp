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

// Connecting to the Database
let mongodb_url = 'mongodb://localhost/';
let dbName = 'darkroom';
// Define a url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName
mongoose.connect(MONGODB_URI,options);
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