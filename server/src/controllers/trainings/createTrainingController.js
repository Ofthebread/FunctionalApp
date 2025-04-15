//importamos modelos
import createTrainingModel from '../../models/trainings/createTrainingModel.js';
import getUserByIdModel from '../../models/users/getUserByIdModel.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función controladora que crea un entrenamiento
const createTrainingController = async (req, res, next) => {
    try {
        //obtenemos los campos necesarios del body
        const { title, description } = req.body;

        //si faltan campos lanzamos un error
        if (!title || !description) {
            generateErrorUtil('Faltan campos', 400);
        }

        //obtenemos el id del coach
        const coachId = req.user.id;

        //insertamos el entrenamiento en la base de datos
        const training = await createTrainingModel(title, description, coachId);

        //enviamos la respuesta
        res.send({
            status: 'ok',
            message: 'Entrenamiento creado con éxito',
            data: training,
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default createTrainingController;
