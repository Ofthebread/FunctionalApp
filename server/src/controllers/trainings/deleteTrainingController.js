//importamos el modelo
import deleteTrainingModel from '../../models/trainings/deleteTrainingModel.js';

//función que elimina un entrenamiento
const deleteTrainingController = async (req, res, next) => {
    try {
        //obtenemos el id del entrenamiento
        const { id } = req.params;

        //eliminamos el entrenamiento
        await deleteTrainingModel(id);

        //enviamos la respuesta
        res.send({
            status: 'ok',
            message: 'Entrenamiento eliminado correctamente',
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default deleteTrainingController;
