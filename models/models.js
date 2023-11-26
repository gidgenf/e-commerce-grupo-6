const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "ecommerce",
  connectionLimit: 5,
});

const getUserByUsernameAndPassword = async (username, password) => {  //toma el usuario y el password del cuerpo de la petición
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query(
      "SELECT id, username FROM users WHERE username=? AND password=?",  //selecciona el id en base a los datos de usuario y password
      [username, password]
    );

    return rows[0]; //retorna el resultado si existe 
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
  return false;  //retorna false si no encuentra nada
};

module.exports = {
    getUserByUsernameAndPassword,
  };
  