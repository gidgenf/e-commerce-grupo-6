const express = require("express");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "CLAVE ULTRA SECRETA";
const usersModel = require('./models/usersModel');
const usersRouter = require("./routes/usersRoute");

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.post("/login", async (req, res) => {  
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

app.use("/users", usersRouter);

app,get('/')

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});