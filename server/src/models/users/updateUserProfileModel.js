//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos la función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y actualiza el perfil del usuario
const updateUserProfileModel = async (
    userId,
    { email, firstName, lastName },
) => {
    //creamos la conexión a la base de datos
    const pool = await getPool();

    //obtenemos listado de usuarios con el email dado
    const [user] = await pool.query(
        `SELECT userId FROM users WHERE email=? AND userId !=?`,
        [email, userId],
    );

    //si hay usuarios con ese email lanzamos un error
    if (user.length > 0) {
        generateErrorUtil('Ya existe un usuario con ese email', 409);
    }

    //actualizamos el perfil del usuario
    await pool.query(
        `UPDATE users SET email=?,firstName=?,lastName=? WHERE userId=?`,
        [email, firstName, lastName, userId],
    );

    //obtenemos los datos actualizados
    const [updatedUser] = await pool.query(
        `SELECT userId,email,firstname,lastName,avatar,role FROM users WHERE userId=?`,
        [userId],
    );

    //devolvemos los datos actualizados
    return updatedUser[0];
};
//exportamos la función
export default updateUserProfileModel;
