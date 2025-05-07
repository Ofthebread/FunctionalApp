//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos el generador de errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función que se conecta a la base de datos y devuelve los usuarios que de un entrenamiento
const getTrainingUsersModel = async (trainingId) => {
    //obtenemos la conexión
    const pool = await getPool();

    //verificiamos que el entrenamiento existe
    const [trainings] = await pool.query(
        `SELECT trainingId FROM trainings WHERE trainingId=?`,
        [trainingId],
    );

    if (trainings.length === 0) {
        generateErrorUtil('Entrenamiento no encontrado', 404);
    }

    //obtenemos los usuarios asignados al entrenamiento
    const [users] = await pool.query(
        `
        SELECT u.userId, u.username, u.firstName, u.lastName, u.email, ut.assignedAt 
        FROM users u
        INNER JOIN users_trainings ut ON u.userId = ut.userId
        WHERE ut.trainingId = ?
        ORDER BY ut.assignedAt DESC
        `,
        [trainingId],
    );
    //devolvemos los usuarios
    return users;
};

//exportamos la función
export default getTrainingUsersModel;
