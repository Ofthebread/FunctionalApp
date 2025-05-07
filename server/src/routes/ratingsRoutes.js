//importamos express
import express from 'express';

//importamos middlewares
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleMiddleware from '../middlewares/authRoleMiddleware.js';

//importamos controladores
import insertRatingTrainingController from '../controllers/ratings/indexRatingsControllers.js';
//creamos router
const router = express.Router();

//Valoraciones de entrenamientos
//Crear valoración de entrenamiento
router.post(
    '/training/:trainingId',
    authMiddleware,
    insertRatingTrainingController,
);
//Listado de valoraciones de un entrenamiento

//Editar una valoración de entrenamiento

//Eliminar una valoración de entrenamiento

//Valoraciones de coaches
//Crear valoración de un coach

//Listado de valoraciones de un coach

//Editar una valoración de un coach

//Eliminar una valoración de un coach

//Valoraciones de la app
//Crear valoración de la app

//Listado de valoraciones de la app

//Editar una valoración de la app

//Eliminar una valoración de la app
//Exportamos router
export default router;
