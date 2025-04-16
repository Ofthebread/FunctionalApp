//importamos modelo
import getTrainingModel from '../../models/trainings/getTrainingModel.js';

//función que obtiene un entrenamiento
const getTrainingController = async (req, res, next) => {
    try {
        //obtenemos el id del entrenamiento
        const { id } = req.params;

        //obtenemos el entrenamiento
        const training = await getTrainingModel(id);

        //enviamos la respuesta
        res.send({
            status: 'ok',
            data: training,
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default getTrainingController;
