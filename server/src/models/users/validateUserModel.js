//importamos conexion con la base de datos
import { getPool } from '../../db/getPool.js';

//importamos función que lanza un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Creamos función que se conecta con la base de datos para activar al usuario.
const validateUserModel = async (regCode) => {
    //obtenemos el pool
    const pool = await getPool();

    //obtenemos listado de usuarios con el codigo recibido
    const [users] = await pool.query(
        `
		SELECT userId FROM users WHERE regCode=?`,
        [regCode],
    );

    //si no hay ningún usuario con ese código de registro, lanzamos un error
    if (users.length < 1) {
        generateErrorUtil('Código de registro inválido', 400);
    }

    //Actualizamos la columna active de estado para validarlo
    await pool.query(
        `
		UPDATE users SET active = TRUE, regCode=null WHERE regCode = ?`,
        [regCode],
    );
};
//exportamos la función
export default validateUserModel;
