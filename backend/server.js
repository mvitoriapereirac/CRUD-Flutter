const express = require('express');

//app configuration
const app = express();

const port = 3000;

//middleware configuration
app.use(express.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//define item list
let itemList = [
    {
        id: "1", name: "name here"
    }
];

//api routes
//CRUD operations
app.get('/api/v1/items', (req, res) => {
    return res.json(itemList)
});
app.post('/api/v1/items', (req, res) => {
    let newItem = {
        id: String(itemList.length + 1),
        name: req.body.name
    }
    itemList.push(newItem)
    res.status(201).json(newItem);
});
app.put('/api/v1/items/:id', (req, res) => {
    let itemId = req.params.id
    let updatedItem = {
        id: itemId, 
        name: req.body.name
    };
    let index = itemList.findIndex( item => item.id === itemId )

    if ( index !=="-1" ) {
        itemList[index] = updatedItem
        res.json(updatedItem)

    } else {
        res.status(404).json({message: "Item not found"})
    }
});
app.delete('/api/v1/items/:id', (req, res) => {
    let itemId = req.params.id;
    let index = itemList.findIndex( item => item.id === itemId);

    if(index !== -1){
        let deletedItem = itemList.splice(index, 1)
        res.json(deletedItem[0])


    } else {
        res.status(404).json({message: "Item not found"})
    }
});



//listeners configuration
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})