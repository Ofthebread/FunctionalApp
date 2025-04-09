//importamos función que lanza errores
import generateErrorUtil from '../utils/generateErrorUtil.js';

//middleware que verifica el rol del usuario
const authRoleMiddleware = (role) => {
    //devolvemos una función middleware
    return (req, res, next) => {
        try {
            //si el rol del usuario no coincide con el rol, lanzamos un error
            if (req.user.role !== role) {
                generateErrorUtil(
                    'No tienes permisos para realizar esta acción',
                    403,
                );
            }
            //si el rol coincide, pasamos al siguiente middleware
            next();
        } catch (err) {
            next(err);
        }
    };
};
//exportamos middleware
export default authRoleMiddleware;
