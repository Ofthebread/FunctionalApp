//importamos las dependencias
import path from 'path';
import fs from 'fs/promises';

//importamos la función que genera un error
import generateErrorUtil from './generateErrorUtil.js';

//Función que elimina una imagen del disco
const removeImgUtil = async (imgName) => {
    try {
        //Ruta absoluta a la imagen que queremos eliminar
        const imgPath = path.join(
            process.cwd(),
            process.env.UPLOADS_DIR,
            imgName,
        );
        try {
            //tratamos de acceder a la imagen con access
            await fs.access(imgPath);
        } catch {
            //si access genera un error, quiere decir que la imagen no existe. Terminamos la función.
            return;
        }
        //eliminamos la imagen
        await fs.unlink(imgPath);
    } catch (err) {
        console.error(err);
        generateErrorUtil('Error al eliminar la imagen del disco', 500);
    }
};
//exportamos la función
export default removeImgUtil;
