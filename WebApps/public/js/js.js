$(function(){
	var container = $(".supercontainer");
	var div = $("<div/>");
	
	var childOne = div.clone();
	var childTwo = div.clone();
	
	  // Signal good static resource serving from the app.js Node server
	childOne.append($("<h4/>").text("jQuery Page Loaded!"));
	
	  // Reference the app.js Node server to determine final routing of resources - this are shortcuts
	childTwo.append( div.clone().append(  $("<a/>").text("React Toggle Demo").attr("href", "./Toggle")  ) );
	childTwo.append( div.clone().append(  $("<a/>").text("React List Demo  ").attr("href", "./List ")   ) );
	
	  // Clean out the body and refill with our "teenagers"
	container.empty();
	container.append(childOne);
	container.append(childTwo);
		
	console.log("JQuery script complete...");
});
