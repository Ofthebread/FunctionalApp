//importamos modelo
import getUserTrainingsModel from '../../models/trainings/getUserTrainingsModel.js';
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que obtiene los entrenamientos de un usuario
const getUserTrainingsController = async (req, res, next) => {
    try {
        //obtenemos el usuario autenticado del token
        const { userId, role } = req.user;

        if (!userId) {
            generateErrorUtil('Usuario no autenticado', 401);
        }

        //si se proporciona un userId en los parámetros y el usuario no es admin/coach
        if (req.params.userId && role === 'user') {
            //solo puede ver sus propios entrenamientos
            if (Number(req.params.userId) !== userId) {
                generateErrorUtil(
                    'No tienes permisos para ver los entrenamientos de otro usuario',
                    403,
                );
            }
        }

        //usamos el userId de los parámetros si existe (para admin/coach) o el del usuario autenticado
        const targetUserId = req.params.userId
            ? Number(req.params.userId)
            : userId;

        //obtenemos los entrenamientos del usuario
        const trainings = await getUserTrainingsModel(targetUserId);

        //enviamos una respuesta
        res.send({
            status: 'ok',
            data: trainings,
        });
    } catch (err) {
        next(err);
    }
};
//exportamos la función
export default getUserTrainingsController;
