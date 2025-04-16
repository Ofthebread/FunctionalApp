//importamos la conexión a  la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta a la base de datos y que devuelve todos los usuarios
const listUserModel = async () => {
    //obtenemos el pool de conexiones
    const pool = await getPool();

    //obtenemos los usuarios
    const [users] = await pool.query(`
		SELECT userId, username, email, firstName, lastName, avatar, role, active, createdAt, modifiedAt FROM users ORDER BY createdAt DESC`);

    //devolvemos los usuarios
    return users;
};

//exportamos la función
export default listUserModel;
