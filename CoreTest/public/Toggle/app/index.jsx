require('jquery');
/*global $*/
$.fn.DOM = function() {
    return this.get(0);
}

import React from 'react';
import {render} from 'react-dom';
import AwesomeComponent from './AwesomeComponent.jsx';
import Toggler from './Toggler.jsx';

console.log("index.jsx --> JS --> Hello!");

var pageRoot = $(".supercontainer");
var div = $("<div/>");

console.log("index.jsx --> expanding root!");
pageRoot.append(div.clone()).append(div.clone());

var childOne = pageRoot.children().eq(0);
var childTwo = pageRoot.children().eq(1);

console.log("index.jsx --> filling child 1!");
childOne.append($("<h2/>").html("index.jsx --> jQuery --> HELLO!<br><br>TOGGLE:"));

var cbButton = function(number){
    console.log("index.jsx Callback Val: " + number);
}

var toggleCallback = function(status){
    console.log("index.jsx Callback Toggle: " + status);
    $.ajax({
	url : '/Toggle',
	type : 'POST',
	data : {
	    'type' : "button_toggle",
	    'status' : status,
	},
	dataType:'json',
	success : function(data) {              
	    console.log("Success AJAX Call -");
	    console.log(data);
	},
	error : function(request,error)
	{
	    console.log("Error: " + JSON.stringify(request) );
	}
    });
}

class App extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            number : 0
        };
        this.cb = this.cb.bind(this);
    }
    
    cb(number){
        cbButton(number);
        this.setState({number});
    }
    
    sb(number){
      console.log("Submit Function - index.jsx!");
      cbButton(number);
      var name = $(".name-input").val();
      cbButton(name);
      $.ajax({
	  url : '/Toggle',
	  type : 'POST',
	  data : {
	      'type' : "user_input",
	      'name' : name,
	      'number' : number
	  },
	  dataType:'json',
	  success : function(data) {              
	      console.log("Success AJAX Call -");
	      console.log(data);
	  },
	  error : function(request,error)
	  {
	      console.log("Error: " + JSON.stringify(request) );
	  }
      });
    }
    
    toggleCB(status){
      console.log("Toggle called to -> " + status);
      toggleCallback(status);
    }
    
    render() {
        return (
            <div className="coreSpan">
                <div className="alert"> React (index.jsx), Callback --> {this.state.number}</div>
                <div className="alert">Name:<input type="text" className="name-input alert form-control"></input></div>
                <AwesomeComponent cbFunc={this.cb} sbFunc={this.sb} />
                <Toggler toggleCB={this.toggleCB}/>
            </div>
        );
    }
}


console.log("index.jsx --> rendering TOGGLE into child 2!");
render(<App/>, childTwo.DOM());
