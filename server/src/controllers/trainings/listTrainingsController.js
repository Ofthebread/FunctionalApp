//importamos el modelo
import listTrainingsModel from '../../models/trainings/listTrainingsModel.js';

//funicón que devuelve todos los entrenamientos
const listTrainingsController = async (req, res, next) => {
    try {
        //obtenemos los entrenamientos
        const trainings = await listTrainingsModel();

        //enviamos la respuesta
        res.send({
            status: 'ok',
            data: trainings,
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default listTrainingsController;
