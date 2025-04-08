//importamos modelos
import updateUserProfileModel from '../../models/users/updateUserProfileModel.js';

//importamos la función que lanza un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que actualiza el perfil del usuario
const updateUserProfileController = async (req, res, next) => {
    try {
        //obtenemos los datos del body
        const { email, firstName, lastName } = req.body;

        //si faltan campos lanzamos un error
        if (!email || !firstName || !lastName) {
            generateErrorUtil('Faltan campos', 400);
        }

        //actualizamos el perfil y obtenemos los datos
        const updatedUser = await updateUserProfileModel(req.user.id, {
            email,
            firstName,
            lastName,
        });

        //enviamos la respuesta
        res.send({
            status: 'ok',
            message: 'Usuario actualizado',
            data: {
                user: updatedUser,
            },
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default updateUserProfileController;
