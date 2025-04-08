//importamos los modelos necesarios
import getUserByIdModel from '../../models/users/getUserByIdModel.js';

//Función controladora que devuelve el perfil del usuario
const privateUserProfileController = async (req, res, next) => {
    try {
        //obtenemos los datos de los usuarios
        const user = await getUserByIdModel(req.user.id);

        //enviamos la respuesta
        res.send({
            status: 'ok',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default privateUserProfileController;
