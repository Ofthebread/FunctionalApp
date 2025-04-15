//importamos las funciones controladoras de users
import registerUserController from './registerUserController.js';
import validateUserController from './validateUserController.js';
import loginUserController from './loginUserController.js';
import privateUserProfileController from './privateUserProfileController.js';
import updateUserAvatarController from './updateUserAvatarController.js';
import updateUserProfileController from './updateUserProfileController.js';
import updateUserPassController from './updateUserPassController.js';
import sendRecoveryPassController from './sendRecoveryPassController.js';
import useRecoveryPassController from './useRecoveryPassController.js';
import updateRoleController from '../admin/updateRoleController.js';

//exportamos las funciones
export {
    registerUserController,
    validateUserController,
    loginUserController,
    privateUserProfileController,
    updateUserAvatarController,
    updateUserProfileController,
    updateUserPassController,
    sendRecoveryPassController,
    useRecoveryPassController,
    updateRoleController,
};
