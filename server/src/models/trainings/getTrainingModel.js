//importamos conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos función para generar error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos
const getTrainingModel = async (trainingId) => {
    //obtenemos el pool
    const pool = await getPool();

    //obtenemos el entrenamiento
    const [training] = await pool.query(
        `
		SELECT t.*, u.firstName as coachName FROM trainings t LEFT JOIN users u ON t.createdBy = u.userId WHERE t. trainingId=?`,
        [trainingId],
    );
    //si no existe el entrenamiento, lanzamos un error
    if (training.length === 0) {
        generateErrorUtil('Entrenamiento no encontrado', 404);
    }

    //devolvemos el entrenamiento
    return training[0];
};
//exportamos la función
export default getTrainingModel;
