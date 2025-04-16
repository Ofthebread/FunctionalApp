//importamos modelo
import toggleUserActiveModel from './toggleUserActiveModel.js';

//función que modifica el estado de un usuario
const toggleUserActiveController = async (req, res, next) => {
    try {
        //obtenemos el id del usuario de params
        const { id, active } = req.params;

        //convertimos el valor active en booleano
        const isActive = active === 'true' ? 1 : 0;

        //actualizamos el estado de active del usuario
        await toggleUserActiveModel(id, isActive);

        //enviamos la respueta
        res.send({
            status: 'ok',
            message: `Usuario ${isActive ? 'activado' : 'desactivado'} correctamente`,
        });
    } catch (err) {
        next(err);
    }
};

//exportamos la función
export default toggleUserActiveController;
