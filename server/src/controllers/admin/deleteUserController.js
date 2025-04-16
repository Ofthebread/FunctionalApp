//importamos los modelos
import deleteUserModel from '../../models/admin/deleteUserModel.js';

//función que elimina al usuario
const deleteUserController = async (req, res, next) => {
    try {
        //obtenemos el id del usuario
        const { id } = req.params;

        //eliminamos al usuario
        await deleteUserModel(id);

        //enviamos una respuesta
        res.send({
            status: 'ok',
            message: 'Usuario eliminado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default deleteUserController;
