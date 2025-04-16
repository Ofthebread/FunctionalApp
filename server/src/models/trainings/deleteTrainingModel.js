//importamos la conexión a la base datos
import { getPool } from '../../db/getPool.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y elimina un entrenamiento
const deleteTrainingModel = async (trainingId) => {
    //obtenemos el pool de conexiones
    const pool = await getPool();

    //obtemos el entrenamiento
    const [training] = await pool.query(
        `SELECT trainingId FROM trainings WHERE trainingId=?`,
        [trainingId],
    );

    //si no encontramos el entrenamiento, lanzamos un error
    if (training.length === 0) {
        generateErrorUtil('Entrenamiento no encontrado', 404);
    }

    //eliminamos el entrenamiento
    await pool.query(`DELETE FROM trainings WHERE trainingId=?`, [trainingId]);
};
//exportamos la función
export default deleteTrainingModel;
