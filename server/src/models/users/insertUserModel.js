//importamos dependencias
import crypto from 'crypto';
import bcrypt from 'bcrypt';

//importamos la función que permite conectarse a la base de datos
import { getPool } from '../../db/getPool.js';

//Importamos la función que genera un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Importamos función que envia un correo.
import sendEmailUtil from '../../utils/sendEmailUtil.js';

//Función que se conecta con la base de datos para crear un nuevo usuario.
const insertUserModel = async (
    username,
    email,
    password,
    firstName,
    lastName,
    role,
) => {
    //obtenemos el pool
    const pool = await getPool();
    //obtenemos listado de usuarios, donde nos quedamos con la posición 0.
    let [users] = await pool.query(
        `SELECT userId FROM users WHERE username=?`,
        [username],
    );

    //Lanzamos un error si ya existe un usuario con ese nombre
    if (users.length > 0) {
        throw generateErrorUtil('Nombre de usuario no disponible', 400);
    }

    //obtenemos el listado de usuarios que tengan el email que recibimos por body
    [users] = await pool.query(`SELECT email FROM users WHERE email=?`, [
        email,
    ]);

    //Lanzamos un error si ya existe un usuario con ese email
    if (users.length > 0) {
        throw generateErrorUtil('Ese email ya existe', 400);
    }

    //generamos un código de registro de 15 carácteres
    const regCode = crypto.randomBytes(15).toString('hex');

    //encriptamos la contraseña
    const hashedPass = await bcrypt.hash(password, 10);

    //generamos la fecha actual
    const now = new Date();

    //Insertamos el usuario en la tabla correspondiente
    await pool.query(
        `
	INSERT INTO users (username,email,password,firstName,lastName,regCode,createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, email, hashedPass, firstName, lastName, regCode, now],
    );
    //asunto del email de verificación
    const emailSubject = 'Activa tu usuario en Functional Hybrid! 💪';
    //Cuerpo del email de verificación
    const emailBody = `
	¿Bienvenid@ ${username}!
	
	Gracias por registrarte. Para activar tu cuenta, haz click en el siguiente enlace ⬇️:
	${process.env.CLIENT_URL}/validate/${regCode}`;

    //enviamos el correo
    await sendEmailUtil(email, emailSubject, emailBody);
};

//exportamos la función
export default insertUserModel;
