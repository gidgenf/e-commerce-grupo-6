const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");


const cats = require("./api/cats/cat.json");
app.get('/cats', (req, res) => {
  res.json(cats);
});


app.get('/cats_products/:id', (req, res) => {
  let idCat = req.params.id;
  let cats_products = require('./api/cats_products/' + idCat + '.json');
  res.json(cats_products);
});
app.get('/products/:id', (req, res) => {
  let idproduct = req.params.id;
  let products = require('./api/products/'+ idproduct + '.json');
  res.json(products);
});
app.get('/products_comments/:id',(req,res)=>{
let idcomment = req.params.id;
let commentProduct = require('./api/products_comments/'+ idcomment + '.json');
res.json(commentProduct);
})
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});