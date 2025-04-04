//importamos dependencias
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//importamos los modelos
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

//importamos la función que lanza un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//creamos la función que permite iniciar sesión al usuario
const loginUserController = async (req, res, next) => {
    try {
        //obtenemos datos necesarios del body
        const { email, password } = req.body;

        //si faltan campos lanzamos un error
        if (!email || !password) {
            generateErrorUtil('Faltan campos', 400);
        }

        //obtenemos los datos del usuario con el email proporcionado
        const user = await selectUserByEmailModel(email);

        //Variable que nos dirá si la contraseña es válida
        let isValidPassword;

        //comprobamos si la contraseña es válida únicamente si existe el usuario.
        if (user) {
            isValidPassword = await bcrypt.compare(password, user.password);
        }

        //si el usuario no existe o si la contraseña no es válida, lanzamos un error
        if (!user || !isValidPassword) {
            generateErrorUtil('Credenciales inválidas', 403);
        }

        //si el usuario no está activado, lanzamos un error
        if (!user.active) {
            generateErrorUtil('Usuario pendiente de activar', 403);
        }

        //almacenamos la información que queremos agregar al token
        const tokenInfo = {
            id: user.id,
            role: user.role,
        };

        //creamos el token
        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '7d',
        });

        res.send({
            status: 'ok',
            data: {
                token,
            },
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default loginUserController;
