//importamos conexión de la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta con la base de datos para devolver un usuario con un email asociado
const selectUserByEmailModel = async (email) => {
    //obtenemos el pool
    const pool = await getPool();

    //obtenemos listado de usuarios con el email proporcionado
    const [users] = await pool.query(
        `
		SELECT userId,password,active, role FROM users WHERE email=?`,
        [email],
    );

    // se devielve el usuario en posición 0 del array.
    return users[0];
};
//exportamos la función
export default selectUserByEmailModel;
