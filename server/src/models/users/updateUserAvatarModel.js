//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta a la base de datos y actualiza el avatar
const updateUserAvatarModel = async (avatar, userId) => {
    //obtenemmos el pool
    const pool = await getPool();

    //generamos la fecha actual
    const now = new Date();

    //actualizamos el avatar
    await pool.query(`UPDATE users SET avatar=?, modifiedAt=? WHERE userId=?`, [
        avatar,
        now,
        userId,
    ]);
};
//exportamos la función
export default updateUserAvatarModel;
