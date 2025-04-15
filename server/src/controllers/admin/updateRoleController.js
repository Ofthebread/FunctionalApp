//importamos los modelos
import updateRoleModel from '../../models/admin/updateRoleModel.js';

//importamos función que lanza error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que cambia el rol del usuario
const updateRoleController = async (req, res, next) => {
    try {
        //obtenemos el id del usuario a modificar
        const { id } = req.params;

        //obtenemos el rol a cambiar
        const { role } = req.body;

        //verificamos que el rol es válido
        const validRoles = ['admin', 'user', 'coach'];
        if (!validRoles.includes(role)) {
            generateErrorUtil('El rol no es válido', 400);
        }

        //llamamos a la función que cambiar el rol
        await updateRoleModel(id, role);

        //enviamos respuesta
        res.send({
            status: 'ok',
            message: 'Rol cambiado correctamente',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default updateRoleController;
