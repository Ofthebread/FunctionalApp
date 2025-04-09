//importamos modelos
import updateUserPassModel from '../../models/users/updateUserPassModel.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que actualiza la contraseña
const updateUserPassController = async (req, res, next) => {
    try {
        //obtenemos los datos de usuario autenticado
        const userId = req.user?.id;
        //obtenemos los datos del body
        const { currentPassword, newPass } = req.body;

        //si falta algún campo, lanzamos un error
        if (!currentPassword || !newPass) {
            generateErrorUtil('Faltan Campos', 400);
        }

        //si las contraseñas son iguales, lanzamos un error
        if (currentPassword === newPass) {
            generateErrorUtil(
                'La contraseña nueva no puede ser igual que la actual',
                400,
            );
        }
        //actualizamos la contraseña
        await updateUserPassModel(userId, currentPassword, newPass);

        res.status(200).send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default updateUserPassController;
