//importamos modelo
import listUserModel from '../../models/admin/listUsersModel.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que obtiene listado de usuarios
const listUsersController = async (req, res, next) => {
    try {
        //obtenemos listado usuarios
        const users = await listUserModel();

        //si no hay usuarios lanzamos error
        if (users.length === 0) {
            generateErrorUtil('No hay usuarios registrados', 400);
        }

        //devolvemos listado de usuarios
        res.send({
            status: 'ok',
            data: users,
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la funcuón
export default listUsersController;
