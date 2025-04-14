//importamos los modelos
import updateRoleModel from '../../models/admin/updateRoleModel.js';

//importamos función que lanza error
import generateErrorUtil from '../../utils/generateErrorUtil.js';

//función que cambia el rol del usuario
const updateRoleController=async(req,res,next)=>{
    try {
        //obtenemos los datos del param
        const {id}=req.params
        
    } catch (err) {
next(err)        
    }
}
//exportamos la función 
export default updateRoleController;