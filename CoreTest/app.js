
var express = require("express");
var server = express();
var fs = require('fs');
var bodyParser = require('body-parser');
var exec = require('child_process').exec;
var http = require('http').Server(server)
var io = require('socket.io')(http);
var gpio = require('pi-gpio');
/*
 * 	--( SERVER CREATION )--
 */

  // Setup a public directory and port number to listen on
var __dirname = "/home/pi/Desktop/Testing/public/"
var __port = 8000;

  // Start the server listening on the desired port
http.listen(__port, function(){
	  // Do stuff once the server is listening
	console.log("Listening on port " + __port + "!");
});

  // Setup a way to parse POST bodies from jQuery AJAX calls
server.use( bodyParser.json() );         // to support JSON-encoded bodies
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

/*
 * 	--( PRIMARY ROUTING TABLE )--
 */

  // Serve the homepage on an empty GET request
server.get('/', function (req, res) {
  console.log("Replying to \"root\" request...");
  res.sendFile(__dirname + 'index.html');
});

  // Serve the React Application on a GET request for React
server.get('/Toggle', function (req, res) {
  console.log("Replying to \"toggle\" request...");
  res.sendFile(__dirname + "Toggle/client/" + 'index.html');
});

  // Serve the React Application on a GET request for React
server.get('/List', function (req, res) {
  console.log("Replying to \"list\" request...");
  res.sendFile(__dirname + "List/client/" + 'index.html');
});

  // Handle a POST request for the React Application
server.post('/Toggle', function (req, res) {
  console.log("Parsing \"toggle\" POST...");
  console.log(req.body);
  switch(req.body.type){
    case "user_input":
      handleUserData(req, res);
      break;
    case "button_toggle":
      handleToggle(req, res);
      break;
  }
});


/*
 * 	--( SECONDARY ROUTING TABLE )--
 */

  // Backup routing for static serving of public resources (jpg, css, js, etc)
server.use(express.static( __dirname ));

  // Backup routing for static serving of react resources
server.use(express.static( __dirname + "Toggle/" ));

  // Backup routing for static serving of react resources
server.use(express.static( __dirname + "List/" ));


/*
 * 	--( DISPATCH RECEIVERS )--
 */
gpio.open(8, "output", function(err) {		// Open pin 16 for output 
  if(err)console.log("Error with pin init - already exported??");  
});


var handleToggle = function(req, res){
  console.log("Toggle handler received: " + req.body.status);
  
	// NOTE! To disable code blocks, delete the first slash in the upper left corner!
	// NOTE! To enable code blocks, ensure there are two slashes in the upper left corner!
  /*
  //* 	TOGGLE BLOCK --> USE pi-gpio MODULE
  //* 
  var value = 0;
  if(req.body.status == "true"){
    value = 1;
  }
  
  gpio.write(8, value, function(err) {
    if(err) console.log("Pin Setting Error to: " + value + "!");
    else console.log("Pin set to: " + value);	// The current state of the pin 
  });
  //*/
  
  /*
  //* 	TOGGLE BLOCK --> CONTROL BOARD LED
  //* 
  if(req.body.status == "true"){
    ledControl("ON");
  }
  else{
    ledControl("OFF");
  }
  //*/
  
  
  res.status(200).send({success:true});
}

var handleUserData = function(req, res){
  var name = req.body.name;
  var number = parseInt(req.body.number);
  if(typeof number === 'number'){
    console.log(name + " sent number: " + number);
  }
  else{
    console.log(name + " sent bad data!");
  }
  res.status(200).send({success:true});
}


/*
 * 	--( SOCKET HANDLERS )--
 */

//Whenever someone connects this gets executed
io.on('connection', function(socket){
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });
  
    //Whenever someone disconnects this piece of code executed
  socket.on('toggle', function (data) {
    console.log('A user toggled the button!');
    console.log(data);
  });
  
  socket.on('pinQuery', function(){
    socket.emit('pinStatus', {status:gpio.read(8)});
  });

});
/*
 * 	--( ASSOCIATED FUNCTIONS )--
 */
var ledControl = function(onOff){
  console.log("Attempting to turn LED -> " + onOff);
  exec('sudo bash '+ __dirname +'../ledControl.sh ' + onOff, function (error, stdout, stderr) { 
    console.log(" -- STDOUT -- ");
    console.log(stdout);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
