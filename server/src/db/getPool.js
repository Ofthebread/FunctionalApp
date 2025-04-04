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
    user:MYSQL_ADMIN
    password: MYSQL_ADMIN_PASS,
    email: MYSQL_ADMIN_EMAIL || 'admin@example.com' //valor por defecto 
}