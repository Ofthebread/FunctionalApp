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
    loginUserController,
    privateUserProfileController,
    updateUserAvatarController,
    updateUserProfileController,
    updateUserPassController,
} from '../controllers/users/index.js';

//Creamos un router
const router = express.Router();

// Registro de nuevo usuario
router.post('/register', registerUserController);

//Validación usuario
router.put('/validate/:regCode', validateUserController);

// Iniciar sesión de usuario (requiere Validacion)
router.post('/login', loginUserController);

// Obtener perfil del usuario logueado
router.get('/profile', authUserMiddleware, privateUserProfileController);

//Actualizar avatar de usuario. (requiere autenticación)
router.put('/avatar', authUserMiddleware, updateUserAvatarController);

//  Actualizar datos de usuario (requiere autenticación)
router.put('/profile', authUserMiddleware, updateUserProfileController);

// Cambiar contraseña (requiere autenticación)
router.post('/password', authUserMiddleware, updateUserPassController);

// Enviar código de recuperación de contraseña al email del usuario.
//router.put('/password/reset', sendRecoveryPassEmailController);

// Actualiza la contraseña de un usuario con un código de recuperación.
//router.put('/password/reset/:recoverPassCode', useRecoveryPassCodeController);

export default router;
