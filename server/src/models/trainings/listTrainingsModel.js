//importamos la conexión
import { getPool } from '../../db/getPool.js';

//función que se conecta a la base de datos y obtiene los entrenamientos
const listTrainingsModel = async () => {
    //obtenemos el pool de conexiones
    const pool = await getPool();

    //obtenemos los entrenamiento
    const [trainings] = await pool.query(
        `SELECT t.*, u.firstName as coachName FROM trainings t LEFT JOIN users u ON t.createdBy = u.userId ORDER BY t.createdAt DESC`,
    );

    //devolvemos los entrenamientos
    return trainings;
};

//exportamos la función
export default listTrainingsModel;
