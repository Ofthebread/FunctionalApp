//importamos modelo
import validateUserModel from '../../models/users/validateUserModel.js';

//importamos función que lanza un error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//Creamos función controladora que valida la activación del usuario
const validateUserController = async (req, res, next) => {
    try {
        //obtenemos el codigo de registro
        const { regCode } = req.params;

        //Validamos al usuario
        await validateUserModel(regCode);

        //envíamos una respuesta
        res.send({
            status: 'ok',
            message: 'Usuario activado',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default validateUserController;
