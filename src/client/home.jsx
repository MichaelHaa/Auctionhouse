

import React, { Component } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./components/searchBox";


export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchfield: "",
      item: null,
    };
  }

  componentDidMount() {
      // calls the function that gets all the items from the api
    this.fetchItems();
  }
  
  fetchItems = () => {
    fetch("./api/items")
      .then((res) => res.json())
      .then((items) =>
        this.setState({ items }, () => console.log("Items fetched.."))
      );
  };
  // calls only for a specific item and sets the returned object to item.state, uses that state and changes the current bid before it returns it as a put request
  // so when the user "bids " on an item it increments the bid
  fetchItem = async (id) => {
    await fetch("./api/items/" + id)
      .then((res) => res.json())
      .then((item) =>
        this.setState({ item }, () => console.log("got the item"))
      );

    const bid = this.state.item.bid + 1;
    const itemName = this.state.item.itemName;
    const startingPrice = this.state.item.startingPrice;

    const url = "/api/items/" + id;

    const payload = { id, bid, itemName, startingPrice };

    let response;

    try {
      response = fetch(url, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch (err) {
      return false;
    }
    this.fetchItems();
    return response.status === 204;
  };
  // dynamically sets the state in the searchfiled to make filtering while typing possible
  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  // sends the delete request to the api with the id of the item to be deleted
  deleteItem = async (id) => {
    const url = "/api/items/" + id;

    let response;

    try {
      response = await fetch(url, { method: "delete" });
    } catch (err) {
      alert("Delete operation failed: " + err);
      return false;
    }

    if (response.status !== 204) {
      alert("Delete operation failed: status code " + response.status);
      return false;
    }
    alert(("Success, item bought for " + Math.floor(Math.random() * 301 ))+ ",-"  );
    this.fetchItems();
    return true;
  };

  //gets called when users click the bid button, and sets off the GET and PUT function 
  bidItem = async (id) => {
    this.fetchItem(id);
  };

  render() {
    let itemGrid;
    // makes the searchfiled not sensitive to upper / lowercase
    const filteredItems = this.state.items.filter((items) => {
      return items.itemName
        .toLowerCase()
        .includes(this.state.searchfield.toLowerCase());
    });

    itemGrid = (
      <div className="wrapper">
        <ul>
          <div className="cardGrid">
            {filteredItems.map((i) => (
              <li key={"key_" + i.id}>
                <div className="itemCard">
                  <p>
                    {" "}
                    Item name: {i.itemName} <br />
                    Starting price: {i.startingPrice},-
                    <br />
                    Current bid: {i.bid},-
                  </p>
                  <button onClick={(_) => this.deleteItem(i.id)}>Buy</button>
                  <button onClick={(_) => this.bidItem(i.id)}>Bid</button>
                </div>
              </li>
            ))}
          </div>
        </ul>
      </div>
    );

    return (
      <div className="wrapper">
        <div className="searchBar">
          <h1>AuctionHouse</h1>
          <SearchBox searchChange={this.onSearchChange} />
        </div>
        {itemGrid}
        <div>
          <Link to="/addItem">
            <button className="btn">Add new item</button>
          </Link>
        </div>
      </div>
    );
  }
}

//export default ItemBase;
