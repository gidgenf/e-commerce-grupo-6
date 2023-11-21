const mariadb = require("mariadb");

const pool = mariadb.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "",
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

const getUsers = async () => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, username, password, email FROM users"
        );

        return rows;
    } catch (error) {
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
};

const getUserById = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query(
            "SELECT id, username, password, email FROM users WHERE id=?",
            [id]
        );

        return rows[0];
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
};

const createUser = async (user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const response = await conn.query(
            `INSERT INTO users(username, password) VALUE(?, ?)`,
            [user.username, user.password]
        );

        return { id: parseInt(response.insertId), ...user };
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
};

const updateUser = async (id, user) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query(
            `UPDATE users SET username=?, password=? WHERE id=?`,
            [user.nusername, user.password, id]
        );

        return { id, ...user };
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
};

const deleteUser = async (id) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query("DELETE FROM users WHERE id=?", [id]);

        return true;
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) conn.release(); //release to pool
    }
    return false;
};

module.exports = {
    getUserByUsernameAndPassword,
    savePokemonCards,
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
