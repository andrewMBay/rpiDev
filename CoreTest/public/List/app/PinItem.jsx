import React from 'react';

class PinItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        object:this.props.object
    };
    this.clicker = this.clicker.bind(this);
    console.log("List ID: " + this.props.object.pin_id + " spawned!");
  }
  
  getClass (){
    var st = "success";
      if(!this.state.object.value){
	st = "danger";
      }
      return "alert alert-"+st;
  }
  
  getText (){
    var st = "ON";
      if(!this.state.object.value){
	st = "OFF";
      }
      return st;
  }
  
  clicker () {
      console.log("Clicker - ID#" + this.state.object.pin_id + "!");
      this.state.object.value = !this.state.object.value;
      if (typeof this.props.cbFunc === 'function') {
	this.props.cbFunc(this.state.object.pin_id);
      }
      this.forceUpdate();
      console.log("New State: " + this.state.object.value);
  }
  
  render() {
    return (
      <div className="pin-item" id={this.state.object.pin_id}>
	<span className="pin-num">#{this.state.object.pin_id} -> </span><span className="pin-name">{this.state.object.name}: </span><span className={this.getClass()}>{this.getText()}</span>
	<button onClick={this.clicker} className="pin-toggle">TOGGLE</button>
      </div>
    );
  }

}

export default PinItem;