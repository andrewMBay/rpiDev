import React from 'react';

class Toggler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        enabled:true
    };
    this.onToggle = this.onToggle.bind(this);
    this.getAlertClass = this.getAlertClass.bind(this);
    this.getAlertText = this.getAlertText.bind(this);
  }

  onToggle () {
    console.log("- Toggle Click Handled -");
    console.log("Pre-State: " + this.state.enabled);
    this.setState({enabled:!this.state.enabled},function(){
      console.log("Post-State: " + this.state.enabled);
      this.props.toggleCB(this.state.enabled);
      socket.emit("toggle", {state:this.state.enabled});
    });
  }

  getAlertClass () {
    var ret = "alert alert-";
    if(this.state.enabled){
      ret += "success";
    }
    else{
      ret += "danger";
    }
    return ret;
  }
  
  getAlertText () {
    if(this.state.enabled){
      return "ON";
    }
    return "OFF";
  }
  
  render() {
    return (
      <div className="toggler">
        <div className="alert">Current Status: <span className={this.getAlertClass()}>{this.getAlertText()}</span></div>
        <div><button className="toggle-button btn-primary" onClick={this.onToggle}>Toggle</button></div>
      </div>
    );
  }

}

export default Toggler;