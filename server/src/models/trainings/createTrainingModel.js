//importamos conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta a la base de datos que crea un entrenamiento
const createTrainingModel = async (title, description, coachId) => {
    //obtenemos el pool
    const pool = await getPool();

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
        SELECT trainingId,title,description FROM trainings WHERE trainingId=?`,
        [newTraining.insertId],
    );

    //Devolvemos el id del entrenamiento creado
    return training[0];
};
//exportamos la función
export default createTrainingModel;
