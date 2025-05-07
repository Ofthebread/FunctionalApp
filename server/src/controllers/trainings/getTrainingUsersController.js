//importamos modelo
import getTrainingUsersModel from '../../models/trainings/getTrainingUsersModel.js';

//importamos la función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que obtiene los usuarios de un entrenamiento
const getTrainingUsersController = async (req, res, next) => {
    try {
        //obtenemos el id del entrenamiento
        const { trainingId } = req.params;

        //verificamos que se proporcionó el id del entrenamiento
        if (!trainingId) {
            generateErrorUtil('Falta el id del entrenamiento', 400);
        }

        //obtenemos los usuarios del entrenamiento
        const users = await getTrainingUsersModel(trainingId);

        //enviamos respuesta
        res.send({
            status: 'ok',
            data: users,
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default getTrainingUsersController;
