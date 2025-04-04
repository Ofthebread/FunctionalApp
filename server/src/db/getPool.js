//importamos dependencias
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

//cargamos variables de entorno
dotenv.config();

//Obtenemos las variables de entorno necesarias
const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASSWORD,
    MYSQL_DATABASE,
    MYSQL_ADMIN,
    MYSQL_ADMIN_PASS,
    MYSQL_ADMIN_EMAIL,
} = process.env;

//variable que almacenará el grupo de conexiones con la base de datos
let pool;

//configuración del administrador
const adminConfig={
    user:MYSQL_ADMIN,
    password: MYSQL_ADMIN_PASS,
    email: MYSQL_ADMIN_EMAIL || 'admin@example.com' //valor por defecto 
};

//función para obtener el grupo de conexiones
const getPool=async()=>{
    try{
        //si el grupo de conexiones no existe, lo creamos
        if(!pool){
            //Creamos una única conexión con la base de datos
            const dbConnection=await mysql.createConnection({
                host:MYSQL_HOST,
                user:MYSQL_USER,
                password:MYSQL_PASSWORD,  
            });
            //con dicha conexión, creamos la base de datos si no existe
            await dbConnection.query(
                `CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE}`
            );
            //Creamos el grupo de conexiones con la base de datos
            pool=mysql.createPool({
                host:MYSQL_HOST,
                user:MYSQL_USER,
                password:MYSQL_PASSWORD,
                database:MYSQL_DATABASE,
                timezone:'Z',
            });
        }
        //devolvemos el grupo de conexiones
        return await pool;
    } catch (error) {
        console.error(err);
        throw new Error('Error al conectar con la base de datos');
    };
    
}
export{getPool,adminConfig};
