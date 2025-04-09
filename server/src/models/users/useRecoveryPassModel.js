//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos bcrypt para encriptar la contraseña
import bcrypt from 'bcrypt';

//importamos la función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta con la base de datos y usa la contraseña encriptada para actualizar la contraseña del usuario
const useRecoveryPassModel = async (recoverPassCode, newPass) => {
    //obtenemos el pool
    const pool = await getPool();

    //buscamos al usuario con el código de recuperación
    const [user] = await pool.query(
        `SELECT userId FROM users WHERE recoverPassCode=?`,
        [recoverPassCode],
    );

    //Si no hay usuario con este código, lanzamos un error
    if (user.length < 1) {
        generateErrorUtil('Código de recuperación inválido o expirado', 404);
    }
    //obtenemos el id del usuario
    const userId = user[0].userId;

    //encriptamos la contraseña
    const hashedPass = await bcrypt.hash(newPass, 10);

    //generamos la fecha de hoy
    const now = new Date();

    //actualizamos la contraseña del usuario y eliminamos el código de recuperación
    await pool.query(
        `
        UPDATE users SET password=?,recoverPassCode=null,modifiedAt=? WHERE userId=?`,
        [hashedPass, now, userId],
    );
};

//exportamos la función
export default useRecoveryPassModel;
