const express = require("express");
const app = express();
const port = 3000;
let rutaApi = "./api/emercado-api-main/emercado-api-main/"

let cat = require("./api/emercado-api-main/emercado-api-main/cats/cat.json")
app.get('/cats/cat.json',(req,res)=>{

res.json(cat);
res.send("funciona")
})
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });