//importamos la base de datos
import { getPool } from '../../db/getPool.js';

//función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y obtiene los entrenamientos de un usuario
const getUserTrainingsModel = async (userId) => {
    if (!userId) {
        generateErrorUtil('ID de usuario requerido', 400);
    }

    //obtenemos la conexión
    const pool = await getPool();

    //obtenemos el id del usuario
    const [user] = await pool.query(
        `
		SELECT userId FROM users WHERE userId=?`,
        [userId],
    );
    //comprobamos que existe el usuario
    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado', 404);
    }

    //obtenemos los entrenamientos del usuario
    const [trainings] = await pool.query(
        `
		SELECT t.*, u.firstName as coachName, ut.assignedAt FROM trainings t
		INNER JOIN users_trainings ut ON t.trainingId = ut.trainingId
		LEFT JOIN users u ON t.createdBy= u.userId WHERE ut.userId=? ORDER BY ut.assignedAt DESC`,
        [userId],
    );

    //devolvemos los entrenamientos
    return trainings;
};
//exportamos la función
export default getUserTrainingsModel;
