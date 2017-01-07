console.log("Toggle js.js loaded...");
$(document).ready(function() { 
  var toggle = $('.toggle-button');
  toggle.on('click', function(){
    console.log("Toggle button clicked in Toggle/js.js!");
  });
});