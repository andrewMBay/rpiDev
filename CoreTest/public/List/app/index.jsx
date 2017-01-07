require('jquery');
/*global $*/
$.fn.DOM = function() {
    return this.get(0);
}

import React from 'react';
import {render} from 'react-dom';
import PinList from './PinList.jsx'

console.log("LIST --> index.jsx --> OK?");

var pageRoot = $(".supercontainer");
var div = $("<div/>");

console.log("index.jsx --> expanding root!");
pageRoot.append(div.clone()).append(div.clone());

var childOne = pageRoot.children().eq(0);
var childTwo = pageRoot.children().eq(1);

console.log("index.jsx --> filling child 1!");
childOne.append($("<h2/>").html("index.jsx --> jQuery --> OK!<br><br>LIST:"));


class App extends React.Component {
    
    constructor(props) {
        super();
        this.state = {
            number : 0
        };
    }
    
    render() {
        return (
            <div className="coreSpan">
                <PinList />
            </div>
        );
    }
}


console.log("index.jsx --> rendering REACT into child 2!");
render(<App/>, childTwo.DOM());
