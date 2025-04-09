//importamos modelo
import useRecoveryPassModel from '../../models/users/useRecoveryPassModel.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función controladora que actualiza la contraseña con el código de recuperación
const useRecoveryPassController = async (req, res, next) => {
    try {
        //obtenemos el código de recuperación de la url
        const { recoverPassCode } = req.params;

        //obtenemos la nueva contraseña del body
        const { newPass } = req.body;

        //Si no hay nueva contraseña lanzamos error
        if (!newPass) {
            generateErrorUtil('Faltan Campos', 400);
        }

        //actualizamos la contraseña
        await useRecoveryPassModel(recoverPassCode, newPass);

        //enviamos respuesta
        res.send({
            status: 'ok',
            message: 'Contraseña actualizada correctamente',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default useRecoveryPassController;
