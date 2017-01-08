import React from 'react';

class AwesomeComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        likesCount : 0,
        status:"success"
    };
    this.onLike = this.onLike.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.getClass = this.getClass.bind(this);
  }

  onLike () {
    console.log("- Like Click Handled -");
    this.state.likesCount++;
    console.log("AwesomeComponent total likes: " + this.state.likesCount);
    const likes = this.state.likesCount%20;
    if (typeof this.props.cbFunc === 'function') {
            console.log("AwesomeComponent is Attempting Callback...");
            this.props.cbFunc(likes);
    }
    if(likes>4){
      if(likes>9){
	this.state.status = "danger";
      }
      else{
	this.state.status = "warning";
      }
    }
    else{
	this.state.status = "success";
    }
  }

  getClass () {
    return "alert alert-" + this.state.status;
  }
  
  onSubmit () {
    console.log("- Submit Click Handled -");
    if (typeof this.props.sbFunc === 'function') {
	    console.log("AwesomeComponent is Attempting Submit...");
	    this.props.sbFunc(this.state.likesCount%20);
    }
  }
  
  render() {
    return (
      <div>
        <div className="alert">AwesomeComponent Likes: <span className={this.getClass()}>{this.state.likesCount%20}</span></div>
        <div><button className="like-button btn-primary" onClick={this.onLike}>Like Me</button>
        <button className="submit-button btn-primary" onClick={this.onSubmit}>Send Values</button></div>
      </div>
    );
  }

}

export default AwesomeComponent;