//importamos le modelo
import updateTrainingModel from '../../models/trainings/updateTrainingModel.js';

//importamos función que lanza errores
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que edita un entrenamiento
const updateTrainingController = async (req, res, next) => {
    try {
        //obtenemos el id del entrenamiento
        const { id } = req.params;

        //obtenemos el titulo y descripción a editar
        const { title, description } = req.body;

        //si faltan campos, lanzamos un error
        if ((!title, !description)) {
            generateErrorUtil('Faltan campos', 400);
        }

        //actualizamos el entrenamiento
        await updateTrainingModel(id, title, description);

        //enviamos una respuesta
        res.send({
            status: 'ok',
            message: 'Entrenamiento actualizado correctamente',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default updateTrainingController;
