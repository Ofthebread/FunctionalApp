//importamos la conexión a la base de datos
import { getPool } from '../../db/getPool.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que se conecta a la base de datos y asigna un entrenamiento a usuario o viceversa
const assignTrainingModel = async (userId, trainingId) => {
    //obtenemos la conexión
    const pool = await getPool();

    //generamos fecha de hoy
    const now = new Date();

    //obtenemos el usuario
    const [user] = await pool.query(`SELECT userId FROM users WHERE userId=?`, [
        userId,
    ]);

    //si no existe el usuario, lanzamos un error
    if (user.length === 0) {
        generateErrorUtil('Usuario no encontrado', 404);
    }

    //obtenemos el entrenamiento
    const [training] = await pool.query(
        `SELECT trainingId FROM trainings WHERE trainingId=?`,
        [trainingId],
    );

    //si no existe el entrenamiento, lanzamos un error
    if (training.length === 0) {
        generateErrorUtil('Entrenamiento no encontrado', 404);
    }

    //si existe, verificamos si ya está asignado a este usuario
    const [assigned] = await pool.query(
        `
		SELECT * FROM users_trainings WHERE userId=? AND trainingId=?`,
        [userId, trainingId],
    );
    //si está asignado, lanzamos un error
    if (assigned.length > 0) {
        generateErrorUtil('Entrenamiento ya asignado a este usuario', 400);
    }

    //asignamos el entrenamiento al usuario
    await pool.query(
        `
		INSERT INTO users_trainings (userId,trainingId,assignedAt) 
		VALUES (?, ?, ?)`,
        [userId, trainingId, now],
    );
};

//exportamos la función
export default assignTrainingModel;
