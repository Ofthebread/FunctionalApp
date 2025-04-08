//importamos la conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//importamos dependencias necesarias
import bcrypt from 'bcrypt';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y permite cambiar la contraseña
const updateUserPassModel = async (userId, password, newPass) => {
    //obtenemos el pool
    const pool = await getPool();

    //obtenemos la contraseña actual
    const [user] = await pool.query(
        `SELECT password FROM users WHERE userId=?`,
        [userId],
    );
    //Verificamos que la contraseña actual sea la correcta
    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
        generateErrorUtil('Contraseña incorrecta', 401);
    }

    //encriptamos la nueva contraseña
    const hashedPass = await bcrypt.hash(newPass, 10);

    //generamos la fecha actual
    const now = new Date();

    //actualizamos la contraseña del usuario
    await pool.query(
        `UPDATE users SET password=?, modifiedAt = ? WHERE userId=?`,
        [hashedPass, now, userId],
    );
};

//exportamos la función
export default updateUserPassModel;
