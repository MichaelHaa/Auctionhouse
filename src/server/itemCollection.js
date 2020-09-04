
//creates a map to hold items with unique values
const items = new Map();
//generates unique values to new items
let counter = 0;

// is called when the server starts, which creates a few items 
function createAuctions() {

    items.clear();
    counter = 0;

    createNewItem("Nice chair", 10, 11);
    createNewItem("Microwave", 20);
    createNewItem("Snowboard", 300);
    createNewItem("bag of rocks", 70);
    createNewItem("my BA diploma", 5);
    createNewItem("4000 qtips", 10, 12);
}

// creates new items, when users create a new item there are no bids yet, so bid is set to match the starting price.
function createNewItem(itemName, startingPrice, bid) {

    const id = "" + counter;
    counter++;
    

    if(bid === undefined) {
        bid = parseInt(startingPrice)
    }
    

    const item = {
        id: id,
        itemName: itemName,
        startingPrice: startingPrice,
        bid: bid
    };

    items.set(id, item);

    return id;
}
// deletes spesific item based on provided ID
function deleteItem(id){

    return items.delete(id);
}
// gets specific item based on provided ID
function getItem(id){

    return items.get(id);
}
// updates specific item based on provided ID, used for taking bids
function updateBid(item) {
    if(! items.has(item.id)){
        return false;
    }
    items.set(item.id, item)

    return item.id;
}

// return all items to the client all items to the client
function getAllItems(){

    return Array.from(items.values());
}



module.exports = {createAuctions, createNewItem, getAllItems, deleteItem, updateBid, getItem};