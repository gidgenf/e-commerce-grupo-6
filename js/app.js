const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

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
app.get('/user_cart',(req,res)=>{
  let user_cart = require('./api/user_cart/25801.json');
  res.json(user_cart);
});
app.get('/sell',(req,res)=>{
  let sell = require('./api/sell/publish.json');
  req.json(sell);
})
app.get('/products_comments/:id', (req, res) => {
  let idcomment = req.params.id;
  let commentProduct = require('./api/products_comments/'+ idcomment + '.json');
  res.json(commentProduct);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
