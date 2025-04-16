//importamos el modelo
import assignTrainingModel from '../../models/trainings/assignTrainingModel.js';

//función que asigna un entrenamiento a un usuario
const assignTrainingController = async (req, res, next) => {
    try {
        //obtenemos ids del usuario y entrenamiento
        const { userId, trainingId } = req.params;

        //asignamos el entrenamiento al usuario
        await assignTrainingModel(userId, trainingId);

        //enviamos una respuesta
        res.send({
            status: 'ok',
            message: 'Entrenamiento asignado correctamente',
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default assignTrainingController;
