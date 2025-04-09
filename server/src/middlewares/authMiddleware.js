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
        try {
            //desencriptamos el token
            const tokenInfo = jwt.verify(authorization, process.env.SECRET);

            //creamos una propiedad inventada en el objeto "request" para almacenar el Id y rol del usuario
            req.user = {
                id: tokenInfo.id,
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
