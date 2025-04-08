//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta con la base de datos e inserta un código de recuperación para envíarlo por email.
const sendRecoveryPassModel = async (recoverPassCode, email) => {
    //obtenemos el pool
    const pool = await getPool();

    //generamos la fecha actual
    const now = new Date();

    //Actualizamos insertando el código de recuperación
    await pool.query(
        `UPDATE users SET recoverPassCode=?, modifiedAt=? WHERE email=?`,
        [recoverPassCode, now, email],
    );
};
//exportamos la función
export default sendRecoveryPassModel;
