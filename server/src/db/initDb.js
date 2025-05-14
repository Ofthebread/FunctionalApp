//importamos dependencias
import bcrypt from 'bcrypt';
//Accedemos alas variables de fichero .env y las añadimos a lista
import 'dotenv/config';
const {
    MYSQL_ADMIN_USER,
    MYSQL_ADMIN_PASSWORD,
    MYSQL_ADMIN_FIRSTNAME,
    MYSQL_ADMIN_LASTNAME,
    MYSQL_ADMIN_EMAIL,
} = process.env;

//Importamos la función que nos permite conectarnos a la base de datos
import { getPool } from './getPool.js';

//Función principal encargada de crear las tablas de la base de datos
const main = async () => {
    try {
        //Obtnemos el pool de conexions
        const pool = await getPool();

        console.log('Borrando tablas...');

        //Borramos las tablas
        await pool.query(
            'DROP TABLE IF EXISTS app_ratings, coach_ratings, ratings, users_trainings, training_exercises, exercises,trainings, users',
        );
        console.log('Creando tablas...');

        //Creamos la tabla de usuarios
        await pool.query(`
			CREATE TABLE IF NOT EXISTS users(
			userId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			username VARCHAR(100) UNIQUE NOT NULL,
			email VARCHAR(100) UNIQUE NOT NULL,
			password VARCHAR(100) NOT NULL,
			firstName VARCHAR(100) NOT NULL,
			lastName VARCHAR(100) NOT NULL,
			avatar VARCHAR(100),
			role ENUM('admin', 'user','coach') DEFAULT 'user',
			regCode CHAR(30),
			recoverPassCode CHAR(30),
			active BOOLEAN DEFAULT FALSE,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
			)`);

        //Creamos la tabla de entrenamientos
        await pool.query(`
			CREATE TABLE IF NOT EXISTS trainings(
			trainingId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			title VARCHAR(100) NOT NULL,
			description TEXT NOT NULL,
			createdBy INT UNSIGNED,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL
			ON UPDATE CASCADE
			)`);

        //Creamos la tabla de ejercicios
        await pool.query(`
			CREATE TABLE IF NOT EXISTS exercises(
			exerciseId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			type ENUM('WOD', 'carrera', 'fuerza','movilidad','estiramientos','calentamiento') NOT NULL,
			name VARCHAR(100) NOT NULL,
			videoUrl VARCHAR(100) NOT NULL,
			description TEXT,
			createdBy INT UNSIGNED,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (createdBy) REFERENCES users(userId) ON DELETE SET NULL
			ON UPDATE CASCADE
			)`);

        //Creamos la tabla de ejercicios de entrenamientos
        await pool.query(`
			CREATE TABLE IF NOT EXISTS training_exercises(
			traingind_excerciseId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			trainingId INT UNSIGNED NOT NULL,
			exerciseId INT UNSIGNED NOT NULL,
			sets VARCHAR(50) NOT NULL,
			reps VARCHAR(50) NOT NULL,
			rest VARCHAR(50) NOT NULL,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (trainingId) REFERENCES trainings(trainingId) ON UPDATE CASCADE,
			FOREIGN KEY (exerciseId) REFERENCES exercises(exerciseId) ON UPDATE CASCADE
			)`);

        //Creamos la tabla de entrenamientos de usuarios
        await pool.query(`
			CREATE TABLE IF NOT EXISTS users_trainings(
			user_trainingId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			userId INT UNSIGNED NOT NULL,
			trainingId INT UNSIGNED NOT NULL,
			assignedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
			FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE,
			FOREIGN KEY (trainingId) REFERENCES trainings(trainingId) ON UPDATE CASCADE
			)`);

        //Creamos la tabla de valoraciones de entrenamientos
        await pool.query(`
			CREATE TABLE IF NOT EXISTS ratings(
			ratingId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			userId INT UNSIGNED NOT NULL,
			trainingId INT UNSIGNED NOT NULL,
			rpe TINYINT UNSIGNED NOT NULL CHECK (rpe BETWEEN 1 AND 10),
			enjoyment TINYINT UNSIGNED NOT NULL CHECK (enjoyment BETWEEN 1 AND 5),
			rate TINYINT UNSIGNED NOT NULL CHECK (rate BETWEEN 1 AND 5),
			comment TEXT,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE,
			FOREIGN KEY (trainingId) REFERENCES trainings(trainingId) ON UPDATE CASCADE
			)`);

        //Creamos la tabla de valoraciones de coaches
        await pool.query(`
			CREATE TABLE IF NOT EXISTS coach_ratings(
			coachRatingId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			userId INT UNSIGNED NOT NULL,
			coachId INT UNSIGNED NOT NULL,
			rating TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
			comment TEXT,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE,
			FOREIGN KEY (coachId) REFERENCES users(userId) ON UPDATE CASCADE
			)`);

        //Creamos la tabla de valoraciones de la aplicación
        await pool.query(`
			CREATE TABLE IF NOT EXISTS app_ratings(
			appRatingId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
			userId INT UNSIGNED NOT NULL,
			rating TINYINT UNSIGNED NOT NULL CHECK (rating BETWEEN 1 AND 5),
			usability TINYINT UNSIGNED NOT NULL CHECK (usability BETWEEN 1 AND 5),
			features TINYINT UNSIGNED NOT NULL CHECK (features BETWEEN 1 AND 5),
			comment TEXT,
			createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
			FOREIGN KEY (userId) REFERENCES users(userId) ON UPDATE CASCADE
			)`);

        console.log('Tablas creadas!');

        //Encriptamos la constraseña del administrador
        const hashedPass = await bcrypt.hash(`${MYSQL_ADMIN_PASSWORD}`, 10);

        //Insertamos el administrador en la base de datos
        await pool.query(
            `INSERT INTO users (username, email, password, firstName, lastName, role, active) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                `${MYSQL_ADMIN_USER}`,
                `${MYSQL_ADMIN_EMAIL}`,
                `${hashedPass}`,
                `${MYSQL_ADMIN_FIRSTNAME}`,
                `${MYSQL_ADMIN_LASTNAME}`,
                `admin`,
                true,
            ],
        );
        console.log('Usuario administrador creado con éxito!');

        //Cerramos el proceso con código 0
        process.exit(0);
    } catch (err) {
        console.log(err);
        //Cerramos el proceso con código 1
        process.exit(1);
    }
};

//Lamamos a la función principal
main();
