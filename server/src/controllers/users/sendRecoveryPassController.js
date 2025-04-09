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
        //recuperamos emai del usuario
        const { email } = req.body;

        //si no hay email lanzamos error
        if (!email) {
            generateErrorUtil('Faltan campos', 400);
        }

        //buscamos el usuario en la base de datos con ese email
        const user = await selectUserByEmailModel(email);

        //si no hay usuario lanzamos error
        if (!user) {
            generateErrorUtil('Usuario no encontrado', 404);
        }

        //si hay usuario, creamos el codifo de recuperación

        if (user) {
            const recoverPassCode = crypto.randomBytes(15).toString('hex');

            //actualizamos el usuario en la base de datos con el codigo de recuperación
            await sendRecoveryPassModel(recoverPassCode, email);
            //creamos el email
            const emailSubject = 'Código de recuperación de contraseña :)';

            const emailBody = `
            Has solicitado recuperar tu contraseña
            Para recuperar tu contraseña, haz click en el siguiente enlace:
            ${process.env.CLIENT_URL}/users/password/reset/${recoverPassCode}
            `;
            //enviamos el email
            await sendEmailUtil(email, emailSubject, emailBody);
        }
        //enviamos respuesta
        res.send({
            status: 'ok',
            message:
                'Revisa tu correo electrónico y sigue las instrucciones para restablecer tu contraseña.',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos función
export default sendRecoveryPassController;
