//importamos la conexión a la base de datos
import { getPool } from '../../../db/getPool.js';

//importamos la función que lanza errores
import generateErrorUtil from '../../../utils/generateErrorUtil.js';

//función que se conecta a la base dedatos e inserta una valoración de entrenamiento
const insertRatingTrainingModel = async (
    userId,
    trainingId,
    rpe,
    enjoyment,
    rate,
    comment,
) => {
    //obtenemos la conexión
    const pool = await getPool();

    //verificamos si existe el entrenamiento
    const [trainings] = await pool.query(
        `SELECT trainingId FROM trainings WHERE trainingId=?`,
        [trainingId],
    );
    //si no esxiste, lanzamos un error
    if (trainings.length === 0) {
        generateErrorUtil('No existe el entrenamiento', 404);
    }

    //verificamos que el usuario no haya valorado ya este entrenamiento
    const [existingRating] = await pool.query(
        `SELECT ratingId FROM ratings WHERE userId=? AND trainingId=?`,
        [userId, trainingId],
    );

    //si existe, lanzamos un error
    if (existingRating.length > 0) {
        generateErrorUtil('Ya has valorado este entrenamiento', 403);
    }

    //verificamos que el usuario tenga asignado este entrenamiento
    const [assignedTraining] = await pool.query(
        `SELECT * FROM users_trainings WHERE userId=? AND trainingId=?`,
        [userId, trainingId],
    );

    //si no corresponde, lanzamos un error
    if (assignedTraining.length === 0) {
        generateErrorUtil('No tienes asignado este entrenamiento', 403);
    }

    //insertamos la valoración
    const [ratingId] = await pool.query(
        `INSERT INTO ratings (userId, trainingId, rpe, enjoyment, rate, comment) VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, trainingId, rpe, enjoyment, rate, comment],
    );
    return ratingId.insertId;
};

//exportamos la función
export default insertRatingTrainingModel;
