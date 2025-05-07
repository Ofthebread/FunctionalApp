//importamos conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta a la base de datos que crea un entrenamiento
const createTrainingModel = async (title, description, coachId) => {
    //obtenemos el pool
    const pool = await getPool();

    //verificamos que el coachId exista
    if (!coachId) {
        throw new Error('El ID del coach es requerido');
    }

    //verificamos que el coach exista en la base de datos
    const [coach] = await pool.query(
        'SELECT userId FROM users WHERE userId = ? AND role IN ("coach", "admin")',
        [coachId],
    );

    if (coach.length === 0) {
        throw new Error('Coach no encontrado o sin permisos suficientes');
    }
    //generamos la fecha actual
    const now = new Date();

    //insertamos el entrenamiento
    const [newTraining] = await pool.query(
        `INSERT INTO trainings (title,description,createdBy,createdAt) VALUES (?,?,?,?)`,
        [title, description, coachId, now],
    );
    //obtenemos los datos del entrenamiento creado
    const [training] = await pool.query(
        `
        SELECT t.*, u.username as coachName 
        FROM trainings t 
        INNER JOIN users u ON t.createdBy = u.userId 
        WHERE t.trainingId = ?`,
        [newTraining.insertId],
    );

    //Devolvemos el id del entrenamiento creado
    return training[0];
};
//exportamos la función
export default createTrainingModel;
