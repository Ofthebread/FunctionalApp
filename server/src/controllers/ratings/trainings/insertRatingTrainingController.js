//importamos el modelo
import insertRatingTrainingModel from '../../../models/ratings/trainings/insertRatingTrainingModel.js';

//importamos la función que lanza errores
import generateErrorUtil from '../../../utils/generateErrorUtil.js';

//función que crea una valoración de entrenamiento
const insertRatingTrainingController = async (req, res, next) => {
    try {
        //obtenemos los datos necesarios del body
        let { rpe, enjoyment, comment, rate } = req.body;
        const { trainingId } = req.params;
        const userId = req.user.userId;

        //si falta algún campo, lanzamos un error
        if (!rpe || !enjoyment || !comment || !rate) {
            generateErrorUtil('Faltan Campos', 400);
        }

        //Validamos que los campos rpe, enjoyment y rate sean numéricos y ente los valores correctos.
        //convertimos los valores a números
        rpe = Number(rpe);
        enjoyment = Number(enjoyment);
        rate = Number(rate);

        //validamos los valores
        if (rpe < 1 || rpe > 10) {
            generateErrorUtil('El RPE debe estar entre 1 y 10', 400);
        }

        if (enjoyment < 1 || enjoyment > 5) {
            generateErrorUtil('El Enjoyment debe estar entre 1 y 5', 400);
        }

        if (rate < 1 || rate > 5) {
            generateErrorUtil('La Valoración debe estar entre 1 y 5', 400);
        }

        //insertamos la valoración del entrenamiento
        const ratingId = await insertRatingTrainingModel(
            userId,
            trainingId,
            rpe,
            enjoyment,
            rate,
            comment,
        );

        //enviamos una respuesta
        res.send({
            status: 'ok',
            message: 'Valoración creada con éxito',
            data: { ratingId },
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default insertRatingTrainingController;
