//importamos los modelos necesarios
import insertUserModel from '../../models/users/insertUserModel.js';
//importamos la función que genera un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Función controladora que registra un usuario
const registerUserController = async (req, res, next) => {
    try {
        //obtenemos los datos necesarios del body
        const { username, email, password, firstName, lastName } = req.body;

        //lanzamos un error si falta algún campo
        if ((!username, !email, !password, !firstName, !lastName)) {
            throw generateErrorUtil('Faltan campos', 400);
        }

        //insertamos modelo
        await insertUserModel(username, email, password, firstName, lastName);

        //Enviamos una respuesta
        res.status(201).send({
            status: 'ok',
            message:
                'Usuario creado. Por favor, activa tu usuario en el email de verificación que recibirás en tu correo.',
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default registerUserController;
