//importamos dependencias
import express from 'express';

//importamos middleware de autenticación
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleMiddleware from '../middlewares/authRoleMiddleware.js';

//importamos controladores
import createTrainingController from '../controllers/trainings/index.js';

//creamos router
const router = express.Router();
// Crear nuevo entrenamiento (solo coach y admin)
router.post(
    '',
    authMiddleware,
    authRoleMiddleware(['coach', 'admin']),
    createTrainingController,
);

// Ver detalle de un entrenamiento específico (cualquier usuario autenticado
//router.get('/trainings/:id',authMiddleware,getTrainingController);

// Editar un entrenamiento existente (solo coach y admin)

// Lista todos los entrenamientos (solo coach y admin)

// Eliminar un entrenamiento (solo coach y admin)

// Asignar un entrenamiento a un usuario (solo coach y admin)

// Ver valoraciones de un entrenamiento (solo coach y admin)

export default router;
