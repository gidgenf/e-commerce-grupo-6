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


app.get("/", (req, res) => {
  res.send("<h1>Bienvenid@ al servidor</h1>");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let conn;
  try {
    const user = await usersModel.getUserByUsernameAndPassword(username, password);

    if (user) {
      conn = await pool.getConnection();
       await conn.query(
        "INSERT INTO users (username, password) VALUES (?, ?)", 
        [username, password]
      );

      const token = jwt.sign({ username, userId: user.id }, SECRET_KEY);
      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: "Usuario y/o contraseña incorrecto" });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: "Error del servidor" });
  } finally {
    if (conn) conn.end();
  }
});

app.post('/logIn', async (req, res) => {
  let conn;
  try {
    const { username, password } = req.body;

    conn = await pool.getConnection();
    const result = await conn.query("SELECT * FROM users WHERE username = ? AND password = ?", [username, password]);

    if (result.length > 0) {
      const token = jwt.sign({ username, userId: result[0].id }, SECRET_KEY);
      res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    if (conn) return conn.end();
  }
});

app.use("/users", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY); 
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.use("/cart", (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers["access-token"], SECRET_KEY); 
    req.userId = decoded.userId;
    console.log(decoded);
    next();
  } catch (error) {
    res.status(401).json({ message: "Usuario no autorizado" });
  }
});

app.get('/cats/cat.json', (req, res) => {
  let cat = require('./api/cats/cat.json') 

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


app.post('/cart/addProduct/',async(req, res) =>{
  let conn;
  try {
      const { idProduct, name, count, unitCost, currency, image, idUser } = req.body;
  
      conn = await pool.getConnection();
          
          const result = await conn.query(
              "INSERT INTO cart  (idUser, idProduct ,name , count , unitCost, currency, image)", 
              [idUser,idProduct,name, count, unitCost, currency, image,]
          );
  
          
          if (result.affectedRows > 0) {
              res.status(200).json({ message: 'Datos agregados correctamente' });
          } else {
              res.status(404).json({ error: 'No se encontró el registro para actualizar' });
          }
      } catch (err) {
          console.error(err);
          res.status(500).json({ error: 'Error interno del servidor' });
      } finally {
          if (conn) return conn.end(); 
      }



app.get('/cart/dataproduct/:id', async(req,res)=>{
  const userId = req.params.id;

   let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT  FROM cart WHERE idUser = ? ", [userId]);
        res.json(rows);  
    } catch (err) {
        console.error(err);
        res.status(500).send("Error interno del servidor");
    } finally {
        if (conn) return conn.end(); 
    }
});


app.put('/cart/editProduct/', async(req,res)=>{
let conn;
try {
    const { idProduct, count, idUser } = req.body;

    conn = await pool.getConnection();
        
    const result = await conn.query(
      "UPDATE cart SET count=? WHERE idProduct=? AND idUser=?", 
      [count, idProduct, idUser]
    );

        
        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Datos actualizados correctamente' });
        } else {
            res.status(404).json({ error: 'No se encontró el registro para actualizar' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        if (conn) return conn.end(); 
    }
});

});

app.delete('/cart/delete/:id',async(req,res)=>{
  let conn;
  try {
      const id = req.params.id;

      conn = await pool.getConnection();
      const result = await conn.query("DELETE FROM cart WHERE id = ?", [id]);

      if (result.affectedRows > 0) {
          res.status(200).json({ message: 'Item eliminado con éxito' });
      } else {
          res.status(404).json({ error: 'No se encontró el elemento para eliminar' });
      }
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
      if (conn) return conn.end();
  }

})

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});