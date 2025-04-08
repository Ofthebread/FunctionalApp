//importamos modelos
import sendRecoveryPassModel from '../../models/users/sendRecoveryPassModel.js';
import selectUserByEmailModel from '../../models/users/selectUserByEmailModel.js';

//importamos dependencias
import crypto from 'crypto';

//importamos utils
import sendEmailUtil from '../../utils/sendEmailUtil.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función controladora que envía un código de recuperación de contraseña al email indicado
const sendRecoveryPassController = async (req, res, next) => {
    try {
    } catch (err) {
        next(err);
    }
};
//exportamos función
export default sendRecoveryPassController;
