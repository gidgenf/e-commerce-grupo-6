const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(express.static("public"));
app.use(cors());

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

app.get('/api/cats', (req, res) => {
  const catJsonPath = path.join(__dirname, 'api', 'cats', 'cat.json');

  // Lee y envía el contenido de cat.json como respuesta
  res.sendFile(catJsonPath);
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