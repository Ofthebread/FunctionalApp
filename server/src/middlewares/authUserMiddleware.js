// src/middlewares/authMiddleware.js
//importamos dependencias
import jwt from 'jsonwebtoken';

//importamos función que lanza un error
import generateErrorUtil from '../utils/generateErrorUtil.js';

//Creamos middleware que desencripta el token y crea la propiedad user en el objeto request
const authUserMiddleware = async (req, res, next) => {
    try {
    } catch (error) {
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};
//exportamos la función
export default authUserMiddleware;
