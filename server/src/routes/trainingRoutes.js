//importamos dependencias
import express from 'express';

//importamos middleware de autenticación
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleMiddleware from '../middlewares/authRoleMiddleware.js';

//importamos controladores
import {
    createTrainingController,
    getTrainingController,
    listTrainingsController,
    updateTrainingController,
    deleteTrainingController,
    assignTrainingController,
} from '../controllers/trainings/indexTrainings.js';

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
router.get('/:id', authMiddleware, getTrainingController);

// Editar un entrenamiento existente (solo coach y admin)
router.put(
    '/:id',
    authMiddleware,
    authRoleMiddleware(['admin', 'coach']),
    updateTrainingController,
);
// Lista todos los entrenamientos (solo coach y admin)
router.get(
    '',
    authMiddleware,
    authRoleMiddleware(['coach', 'admin']),
    listTrainingsController,
);
// Eliminar un entrenamiento (solo coach y admin)
router.delete(
    '/:id',
    authMiddleware,
    authRoleMiddleware(['coach', 'admin']),
    deleteTrainingController,
);
// Asignar un entrenamiento a un usuario (solo coach y admin)
router.post(
    '/assign/:userId/:trainingId',
    authMiddleware,
    authRoleMiddleware(['coach', 'admin']),
    assignTrainingController,
);
// Ver valoraciones de un entrenamiento (solo coach y admin)

export default router;
