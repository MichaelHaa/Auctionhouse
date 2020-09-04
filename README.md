## About project

to install the project, run 'yarn install'.
to run the project, run 'yarn dev'

this will open op both the server and client on localhost:8080/

This react site is a auction house where vistors can bid on items, put out items for sale or straight up buy the items that are available.

on 8080 you will find the auctionsite itself, where some items that are created on the server and fetched when yarn dev is run will be visible.
right over the auction items there will be a searchbar, where users can search for items by name, and the site will render to filter out the itemnames that doesnt match what the user is typing.
some of the items have a higher bid than the starting price, this means that these items are already bid on, while the items with the same bid and starting price have no bids on them jet.
when clicking on the bid button under one of the items the bid number will go up by 1.
the other button under the items is the buy button, and users can straight up buy an item whenever they want, but since this is an auction they do not get to know the "buyout price" before they buy the item. When clicking the buy button an alert will say that you bought the item and for what price, and the item will dissapear from the itemlist.

if users wish to sell an item, they can either use the button on the bottom that says "add new item" or use the navigation links in the top left corner to go to the "add item" site. both options will route the user to the same site where they can enter an item name, and a starting price. the item will then be added to the auction with the startingprice the user chose, and a bit that matches the starting price.

the about site tells the user what he/she can do on the site.

## Navigation
the navigation links are present at every site in the app, and can be used freely to go between them. 

## Searchbar
the searchbar is triggered with an even, and will on every change to whats written change its state to match. the value from this state is then used to display only the items that matches.

## API endpoints
GET /api/items   -   the client can make a fetch here and the api will return the collection of items on the server, which is a map stored in memory
POST /api/items   -   the client can make post requests here with new items, the api will call the function and provide the data to make a new entry to the map
GET /api/items/:id   -   the client can make a fetch for a specific item when id is provided, this is used to get the item that the client ultimatly want to change, when bidding on it
DELETE /api/items/:id   -   the client can make a delete request if they provide the id of the item to be deleted, the api takes the id and calls the function that deletes the item
PUT /api/items/:id   -   the client can bid on an item, which will change the bid value of said item. the GET with id first fetches the item, the value of the bid field is then upped and sendt back to replace the previous valie.

## itemCollection.js 
this is where the functions on the server are. the app have access to these and can call them when an appropriate api request is made. it has a function that creates a map, and some items to put in it, it also makes sure every item has a unique id. 

## tests
to run the test, run 'yarn test'





