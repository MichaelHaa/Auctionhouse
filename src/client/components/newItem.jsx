

import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

class NewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: this.props.itemName ? this.props.itemName : "",
      startingPrice: this.props.startingPrice ? this.props.startingPrice : "",
    };

    this.ok = this.props.ok ? this.props.ok : "Ok";
  }
  // form for submitting new items
  onFormSubmit = async (event) => {
    event.preventDefault();
    //creates an alert if the user fails to enter name or price
    if(this.state.itemName === "" || this.state.startingPrice === "") {
      alert("please insert item name and starting price")
      return false;
    } 

    const completed = await this.props.okCallBack(
      this.state.itemName,
      this.state.startingPrice,
      this.props.itemId
    );

    

    if (completed) {
      this.props.history.push("/");
    } else {
      alert("Failed to create new auction");
    }
  };

  onItemNameChange = (event) => {
    this.setState({ itemName: event.target.value });
  };

  onStartingPriceChange = (event) => {
    this.setState({ startingPrice: event.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <div>
            <input
              placeholder={"Item name"}
              value={this.state.itemName}
              onChange={this.onItemNameChange}
            />
          </div>
          <div>
            <input
              placeholder={"Price"}
              value={this.state.startingPrice}
              onChange={this.onStartingPriceChange}
            />
          </div>
          <button type="submit" className={"btn"}>
            {this.ok}
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewItem);