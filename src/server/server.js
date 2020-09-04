const {app} = require("./app");
const itemCollection = require("./itemCollection");

const port = process.env.PORT || 8080;


app.listen(port, () => {
    itemCollection.createAuctions();
    console.log('Started NodeJS server on port ' + port);
});

