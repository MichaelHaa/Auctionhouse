

const itemCollection = require('./itemCollection');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));


// get api, calls the function to return all the items
app.get('/api/items', (req, res) => {
    res.json(itemCollection.getAllItems());   
});
// calls the function to return a single item
app.get('/api/items/:id', (req, res) => {

    const item = itemCollection.getItem(req.params["id"]);

    if (item === undefined || item === null) {
        res.status(404);
        res.send()
    } else {
        res.json(item);
    }
});
// POST api, handles post requests and provides the function that creates items with data
app.post('/api/items', (req, res) => {
    
    const dto = req.body;
    const id = itemCollection.createNewItem(dto.itemName, dto.startingPrice);

    res.status(201);
    res.header('location', '/api/items' + id);
    res.send();
});
// DELETE api, hanles delete requests and provides the function with the id of the item to be deleted
app.delete('/api/items/:id', (req, res) => {


    const deleted = itemCollection.deleteItem(req.params.id);
    if (deleted) {
        res.status(204);
    } else {
        
        res.status(404);
    }
    res.send();
});
// PUT api, takes data from the client and updates an item based on id
app.put("/api/items/:id", (req, res) => {

    if(req.params.id !== req.body.id){
        res.status(409);
        res.send();
        return;
    }

    const updated = itemCollection.updateBid(req.body);
    if (updated) {
        res.status(204)
    } else {
        res.status(404)
        
    }
    res.send();
})
/*
app.all('/api*', (req,res) => {
    res.status(404);
    res.send();
});
*/

app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'));
});

module.exports = {app};

