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

// Lista todos los entrenamientos (solo coach y admin)
router.get(
    '',
    authMiddleware,
    authRoleMiddleware(['coach', 'admin']),
    listTrainingsController,
);
// Eliminar un entrenamiento (solo coach y admin)

// Asignar un entrenamiento a un usuario (solo coach y admin)

// Ver valoraciones de un entrenamiento (solo coach y admin)

export default router;
