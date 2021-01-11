import React, { Component } from "react";
class Like extends Component {
  state = {};
  render() {
    let liked = this.props.liked;
    return liked === true ? (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        className="fa fa-heart"
        aria-hidden="true"
      ></i>
    ) : (
      <i
        style={{ cursor: "pointer" }}
        onClick={this.props.onClick}
        className="fa fa-heart-o"
        aria-hidden="true"
      ></i>
    );
  }
}

export default Like;
