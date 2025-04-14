//importamos conexión con la base de datos
import { getPool } from '../../db/getPool.js';

//función que se conecta a la base de datos que crea un entrenamiento
const createTrainingModel = async (title, description, userId) => {
    //obtenemos el pool
    const pool = await getPool();

    //generamos la fecha actual
    const now = new Date();

    //insertamos el entrenamiento
    const [newTraining] = await pool.query(
        `INSERT INTO trainings (title,description,userId,createdAt) VALUES (?,?,?,?)`,
        [title, description, userId, now],
    );

    //Devolvemos el id del entrenamiento creado
    return newTraining.insertId;
};
//exportamos la función
export default createTrainingModel;
