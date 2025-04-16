//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y edita un entrenamiento
const updateTrainingModel = async (trainingId, title, description) => {
    //obtenemos el pool
    const pool = await getPool();

    //generamos la fecha de hoy
    const now = new Date();

    //obtenemos el entrenamiento
    const [training] = await pool.query(
        `
		SELECT trainingId FROM trainings WHERE trainingId=?`,
        [trainingId],
    );

    //si no existe dicho entrenamiento, lanzamos un error
    if (training.length === 0) {
        generateErrorUtil('Entrenamiento no encontrado', 400);
    }

    //actualizamos entrenamiento
    await pool.query(
        `
		UPDATE trainings SET title=?, description=?, modifiedAt=? WHERE trainingId=?`,
        [title, description, now, trainingId],
    );
};
//exportamos la función
export default updateTrainingModel;
