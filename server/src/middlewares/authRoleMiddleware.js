//importamos función que lanza errores
import generateErrorUtil from '../utils/generateErrorUtil.js';

//middleware que verifica el rol del usuario
const authRoleMiddleware = (allowedRoles) => {
    //devolvemos una función middleware
    return (req, res, next) => {
        try {
            //convertimos el parametro a un array
            allowedRoles = Array.isArray(allowedRoles)
                ? allowedRoles
                : [allowedRoles];

            //si el rol del usuario no está en el array, lanzamos un error.
            if (!allowedRoles.includes(req.user.role)) {
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
