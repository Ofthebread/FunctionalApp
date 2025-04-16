// src/routes/userRoutes.js
//importamos dependencias
import express from 'express';

//importamos middleware de autenticación
import authMiddleware from '../middlewares/authMiddleware.js';
import authRoleMiddleware from '../middlewares/authRoleMiddleware.js';

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
    sendRecoveryPassController,
    useRecoveryPassController,
} from '../controllers/users/indexUsers.js';

//importamos funciones controladoras de administrador
import {
    updateRoleController,
    listUsersController,
    toggleUserActiveController,
    deleteUserController,
} from '../controllers/admin/indexAdmin.js';

//Creamos un router
const router = express.Router();

// Registro de nuevo usuario
router.post('/register', registerUserController);

//Validación usuario
router.put('/validate/:regCode', validateUserController);

// Iniciar sesión de usuario (requiere Validacion)
router.post('/login', loginUserController);

// Obtener perfil del usuario logueado
router.get('/profile', authMiddleware, privateUserProfileController);

//Actualizar avatar de usuario. (requiere autenticación)
router.put('/avatar', authMiddleware, updateUserAvatarController);

//  Actualizar datos de usuario (requiere autenticación)
router.put('/profile', authMiddleware, updateUserProfileController);

// Cambiar contraseña (requiere autenticación)
router.post('/password', authMiddleware, updateUserPassController);

// Enviar código de recuperación de contraseña al email del usuario.
router.put('/password/reset', sendRecoveryPassController);

// Actualiza la contraseña de un usuario con un código de recuperación.
router.put('/password/reset/:recoverPassCode', useRecoveryPassController);

// Rutas de administración (protegidas)
//Listar usuarios (requiere autenticación y rol admin)
router.get(
    '/admin/users',
    authMiddleware,
    authRoleMiddleware('admin'),
    listUsersController,
);

//Activar/desactivar usuario (requiere autenticación y rol admin)
router.patch(
    '/admin/users/:id/:active',
    authMiddleware,
    authRoleMiddleware('admin'),
    toggleUserActiveController,
);

//Actualizar rol de usuario (requiere autenticación con rol admin)
router.put(
    '/admin/users/:id/role',
    authMiddleware,
    authRoleMiddleware('admin'),
    updateRoleController,
);

//Eliminar usuario (requiere autenticación y rol admin)
router.delete(
    '/admin/users/:id',
    authMiddleware,
    authRoleMiddleware('admin'),
    deleteUserController,
);

export default router;
