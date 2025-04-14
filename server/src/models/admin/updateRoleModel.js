//importamos la conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//importamos la función que genera los errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y modifica el rol de un usuario.
const updateRoleModel = async (userId, newRole) => {
    //obtenemos el pool
    const pool = await getPool();

    //verificamos si el usuario existe
    const [user] = await pool.query(`SELECT userId from users WHERE userId=?`, [
        userId,
    ]);

    //si no existe, lanzamos un error
    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado', 400);
    }

    //actualizamos el rol del usuario
    await pool.query(`UPDATE users SET role=? WHERE userId=?`, [
        newRole,
        userId,
    ]);
};
//exportamos la función
export default updateRoleModel;
