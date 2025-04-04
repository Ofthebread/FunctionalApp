// src/routes/userRoutes.js
//importamos dependencias
import express from 'express';

//importamos middleware de autenticación
import authUserMiddleware from '../middlewares/authUserMiddleware.js';

//Importamos funciones controladoras del usuario
//cambiar nombres de controladoras
import {
    registerUserController,
    validateUserController,
} from '../controllers/users/index.js';

//Creamos un router
const router = express.Router();

// Registro de nuevo usuario
router.post('/register', registerUserController);

//Validación usuario
router.put('/validate/:regCode', validateUserController);

// Login
//router.post('/login', loginUser);

// Obtener perfil del usuario logueado
//router.get('/profile', authUserMiddleware, getUserProfile);

// Actualizar perfil
//router.put('/profile', authUserMiddleware, updateUserProfile);

// Cambiar contraseña
//router.post('/password', authUserMiddleware, changePassword);

export default router;
