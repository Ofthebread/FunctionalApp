//importamos la función que permite conectarse a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos la función que genera un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y devuelve un usuario por su Id.
const getUserByIdModel = async (userId) => {
    //obtenemos el pool
    const pool = await getPool();

    //obtenemos el listado de usuarios con el id proporcionado
    const [users] = await pool.query(
        `
		SELECT userId,email,firstName,lastName, role, createdAt FROM users WHERE userId=?`,
        [userId],
    );

    //si no existe ningún usuario, lanzamos un error
    if (users.length < 1) {
        generateErrorUtil('Usuario no encontrado', 404);
    }

    //devolvemos el usuario en posición 0 del array
    return users[0];
};
//exportamos la función
export default getUserByIdModel;
