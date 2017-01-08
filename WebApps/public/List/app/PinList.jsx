import React from 'react';
import PinItem from './PinItem.jsx';

var testArray = [
 {name: "John", pin_id: 8, type: "out", value: 0},
 {name: "Beth", pin_id: 9, type: "out", value: 1},
 {name: "Jane", pin_id: 12, type: "in", value: 0}
];
var otherArray = [
 {name: "Jake", pin_id: 22, type: "in", value: 1},
 {name: "Barry", pin_id: 24, type: "out", value: 1},
 {name: "Julie", pin_id: 26, type: "in", value: 0}
];


class PinList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        enabled:true,
        pinlist:testArray
    };
    this.liCallback = this.liCallback.bind(this);
  }
  
  liCallback(value){
    console.log("liCb --> " + value);
    var temp = testArray.concat(otherArray);
    this.setState({pinlist:temp});
  }
  
  render() {
    return (
      <div className="pin-list">
	<ul>
	{
	  this.state.pinlist.map(function(object, i){
	    return <PinItem object={object} key={i} cbFunc={this.liCallback}/>;
	  },this)
	}
	</ul>
      </div>
    );
  }

}

export default PinList;