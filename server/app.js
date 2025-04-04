//Importamos las variables de entorno
import 'dotenv/config';

//importamos dependencias
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';

//importamos rutas

//obtenemos las variables de entorno necesarias
const { PORT, UPLOADS_DIR } = process.env;

//creamos el servidor (aplicación Express)
const app = express();

// Definimos __dirname en módulos ES para usar rutas absolutas (no existe por defecto).
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//carpeta de uploads como estática para acceder a archivos subidos (imágenes, videos, etc.)
app.use('/uploads', express.static(path.join(__dirname, UPLOADS_DIR)));

//Middleware que muestra por consola información aceca de la petición entrante
app.use(morgan('dev'));

//Middleware que eivta problemas de conexión entre cliente y servidor.
app.use(cors());

//Middleware que indica a Express dónde están los archivos estáticos
app.use(express.static(UPLOADS_DIR));

//Middleware que permite leer un body en formato JSON
app.use(express.json());

//Middleware que permite leer un body en formato form-data
app.use(fileUpload());

//Middleware que indica a Express dónde están las rutas.
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/trainings', trainingRoutes);
app.use('/api/ratings', ratingRoutes);

//Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.httpStatus || 500).send({
        status: 'error',
        message: err.message,
    });
});

//Middleware de ruta no encontrada
app.use((req, res) => {
    res.status(400).send({
        status: 'error',
        message: 'Ruta no encontrada',
    });
});

//Indicamos al servidor que escuche peticiones en el puerto indicado
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
