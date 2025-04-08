//importamos las dependencias
import path from 'path';
import fs from 'fs/promises';
import sharp from 'sharp';

//importamos la función que genera un error
import generateErrorUtil from './generateErrorUtil.js';

//Función que almacena una imahen en el servidor. Parametros, el archivo con la imagen y un ancho para redimensionarla
const saveImgUtil = async (img, width) => {
    try {
        //Ruta absoluta al directorio de subida de archivos
        const uploadasPath = path.join(process.cwd(), process.env.UPLOADS_DIR);
        try {
            //el método access nos permite saber si el directorio existe pasandole la ruta y el tipo de acceso que queremos realizar
            await fs.access(uploadasPath);
        } catch {
            //Si access lanza un error, es que el directorio no existe, lo creamos
            await fs.mkdir(uploadasPath);
        }
        //generamos un nombre aleatorio para la imagen
        const imgName = `${crypto.randomUUID()}.png`;

        //ruta absoluta a la imagen
        const imgPath = path.join(uploadasPath, imgName);

        //creamos un objeto tipo sharp con la imagen recibida
        const sharpImg = sharp(img.data);

        //redimensionamos la imagen
        sharpImg.resize(width);

        //guardamos la imagen en la carpeta de subida de archivos
        await sharpImg.toFile(imgPath);

        //retornamos el nombre de la imagen
        return imgName;
    } catch (err) {
        console.error(err);
        generateErrorUtil('Error al guardar la imagen en el disco', 500);
    }
};
//exportamos la función
export default saveImgUtil;
