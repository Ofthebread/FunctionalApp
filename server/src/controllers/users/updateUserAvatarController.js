//importamos los modelos
import updateUserAvatarModel from '../../models/users/updateUserAvatarModel.js';
import getUserByIdModel from '../../models/users/getUserByIdModel.js';

//importamos la función que lanza un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//importamos la función que guarda una imagen en disco
import saveImgUtil from '../../utils/saveImgUtil.js';

//importamos la función que elimina una imagen de disco
import removeImgUtil from '../../utils/removeImgUtil.js';

//Función que actualiza el avatar de un usuario
const updateUserAvatarController = async (req, res, next) => {
    try {
        //obtenemos el avatar del usuario. Con el fin de interrogación estamos indicando que avatar puede ser undefined, y de esa forma evitamos que se lance un error.
        const avatar = req.files?.avatar;

        //si no hay avatar lanzamos un error
        if (!avatar) {
            generateErrorUtil('Faltan campos', 400);
        }

        //obtenemos el id del usuario para poder ver si tiene avatar
        const user = await getUserByIdModel(req.user.id);

        //si el usuario tiene avatar lo eliminamos.
        if (user.avatar) {
            await removeImgUtil(user.avatar);
        }

        //guardamos el avatar en la carpeta de uploads y obtenemos el nombre
        const avatarName = await saveImgUtil(avatar, 100);

        //actualizamos la columna de avatar del usuario en la base de datos
        await updateUserAvatarModel(avatarName, req.user.id);

        res.send({
            status: 'ok',
            message: 'Avatar actualizado',
            data: {
                user: {
                    avatar: avatarName,
                },
            },
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default updateUserAvatarController;
