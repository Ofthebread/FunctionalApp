//importamos la base de datos
import { getPool } from '../../db/getPool.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y modifica el estado de un usuario
const toggleUserActiveModel = async (userId, active) => {
    //obtenemos la conexión
    const pool = await getPool();

    //generamos la fecha de hoy
    const now = new Date();

    //verificamos si el usuario existe
    const [user] = await pool.query(
        `
		SELECT userId FROM users WHERE userID=?`,
        [userId],
    );

    //si no existe el ususario, lanzamos un error
    if (user.length === 0) {
        generateErrorUtil('No existe ningún usuario con ese id', 404);
    }

    //actualizamos el estado del usuario
    await pool.query(
        `
		UPDATE users SET active=?, modifiedAt=? WHERE userId=?`,
        [active, now, userId],
    );
};
//exportamos función
export default toggleUserActiveModel;
