s
import React, { Component } from "react";
import NewItem from "./components/newItem";
import { Link } from "react-router-dom";

class AddItem extends Component {
  constructor(props) {
    super(props);
  }
  //takes the input the user has provided and sends it to the api
  onOk = async (itemName, startingPrice) => {
    const url = "/api/items";

    const payload = { itemName, startingPrice};


    let response;

    try {
      response = await fetch(url, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return false;
    }
    alert("item added!");
    return response.status === 201;
  };

  render() {
    return (
      <div className="wrapper">
        <h1>Add item for sale</h1>
        <NewItem
          itemName={""}
          startingPrice={""}
          ok={"Create"}
          okCallBack={this.onOk}
        />
        <Link to="/">
          <button className="btn">Cancle</button>
        </Link>
      </div>
    );
  }
}

export default AddItem;
