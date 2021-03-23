/**
 * CRUD model - Create, Read, Update, Delete
 */
var express = require('express');
var id_gen = require('shortid');

var app = express();

app.set('view engine', 'jade');

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const products = [
    {
        "id": id_gen.generate(),
        "name": "Name 01",
        "price": 1,
        "description": "Des 01"
    },
    {
        "id": id_gen.generate(),
        "name": "Name 02",
        "price": 2,
        "description": "Des 02"
    },
    {
        "id": id_gen.generate(),
        "name": "Name 03",
        "price": 3,
        "description": "Des 03"
    },
];

// Read and view data from products
app.get('/()?(products)?', (req, res) =>{
    // Print an json array
    //res.json({"code": 0, "message": res.message, "data": products});

    res.render('products', {json_obj: products});
})

app.get('/products/:id', (req, res) =>{
    var id = req.params.id; 

    res.render('details', {id: id, json_obj: products});
});

// Create
app.post('/products', (req, res) => {
    let id = id_gen.generate();
    /*
    var new_item = {"id": id, "name":"Name 04", "price": 4, "description":"Des 04"};
    products.push(new_item);
    res.json(products);
    */

    // urlencoded
    var new_item = req.body;
    new_item.id = id;
    products.push(new_item);
});

// Delete
app.delete('/products/:id', (req, res) => {
    var id = req.params.id; 
    
    for(var i = 0; i < products.length; i++){
        if(products[i].id == id){
            products.splice(i, 1);
        }
    }

    console.log(products);
})

// Update
app.put('/products/:id', (req, res) => {
    var id = req.params.id;
    const name = "New Name";

    products.forEach(item => {
        if(item.id == id){
            item.name = name;
        }
    })
})

// Handmade 404 page
app.use((req, res) => {
    res.status(404);
    res.send("Đường dẫn hoặc phương thức không hợp lệ");
})

var server = app.listen(8080, () =>{
    console.log('http://localhost:8080');
})