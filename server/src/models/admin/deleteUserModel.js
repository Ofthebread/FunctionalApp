//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos la función para generar errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función para que se conecta a la base de datos y elimina a un usuario
const deleteUserModel = async (userId) => {
    //obtenemos el pool
    const pool = await getPool();

    //obtenemos el usuario
    const [user] = await pool.query(
        `
		SELECT userId FROM users WHERE userId=?`,
        [userId],
    );

    //si no hay usuario, lanzamos un error
    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado', 404);
    }

    //eliminamos el usuario
    await pool.query(`DELETE FROM users WHERE userID=?`, [userId]);
};
//exportamos la función
export default deleteUserModel;
