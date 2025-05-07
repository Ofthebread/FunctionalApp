// src/middlewares/authMiddleware.js
//importamos dependencias
import jwt from 'jsonwebtoken';

//importamos función que lanza un error
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Creamos middleware que desencripta el token y crea la propiedad user en el objeto request
const authMiddleware = async (req, res, next) => {
    try {
        //obtenemos el token de autorización
        const { authorization } = req.headers;

        //si falta el token lanzamos un error
        if (!authorization) {
            return next(
                generateErrorUtil('Falta la cabecera de autorización', 401),
            );
        }
        //verificamos que el token comienza con Bearer
        if (!authorization.startsWith('Bearer ')) {
            return next(generateErrorUtil('Formato de token inválido', 401));
        }
        try {
            //extraemos el token eliminando "Bearer " (con espacio)
            const token = authorization.substring(7);

            //desencriptamos el token
            const tokenInfo = jwt.verify(token, process.env.SECRET);

            //creamos una propiedad inventada en el objeto "request" para almacenar el Id y rol del usuario
            req.user = {
                userId: tokenInfo.id,
                role: tokenInfo.role,
            };

            //Pasamos el control al siguiente middleware o función controladora
            next();
        } catch (err) {
            console.error(err);
            next(generateErrorUtil('Token inválido o expirado', 403));
        }
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default authMiddleware;
