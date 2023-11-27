const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";
app.use(express.static("public"));
app.use(cors());
app.use(express.json());
const usersModel = require('./models/models.js');
const cats = require("./api/cats/cat.json");


app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.post("/login", async (req, res) => {  //logeo que recibe los datos de username y password del body
  const { username, password } = req.body;

  try {
    const user = await usersModel.getUserByUsernameAndPassword(username, password);  //pasa como argumentos username y password a getUserByUsernameAndPassword
    if (user) {
      const token = jwt.sign({ username, userId: user.id }, SECRET_KEY);  //se genera el token
      res.status(200).json({ token }); //se envia como respuesta
    } else {
      res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

app.use("/users", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY); //verifica el token
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY); // Verifica el token
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.post('/cart', (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get('/cart', (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.get('/cats/cat.json', (req, res) => {
  let cat = require('./api/cats/cat.json') //espero que no de error

  res.json(cat);
});

app.get('/cats_products/:id', (req, res) => {
  let idCat = req.params.id;
  let cats_products = require('./api/cats_products/' + idCat + '.json');
  res.json(cats_products);
});

app.get('/products/:id', (req, res) => {
  let idproduct = req.params.id;
  let products = require('./api/products/' + idproduct + '.json');
  res.json(products);
});

app.get('/user_cart', (req, res) => {
  let user_cart = require('./api/user_cart/25801.json');
  res.json(user_cart);
});

app.get('/sell', (req, res) => {
  let sell = require('./api/sell/publish.json');
  req.json(sell);
})

app.get('/products_comments/:id', (req, res) => {
  let idcomment = req.params.id;
  let commentProduct = require('./api/products_comments/' + idcomment + '.json');
  res.json(commentProduct);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});