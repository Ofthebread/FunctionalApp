//importamos dependencias
import nodemailer from 'nodemailer';

//importamos la función que lanza un error
import generateErrorUtil from './generateErrorUtil.js';

//obtenemos las variables de entorno
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

//Creamos un transporte (conexión) para poder enviar el email
const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
    },
});

//Función que envía un correo.
const sendEmailUtil = async (email, subject, body) => {
    try {
        //Enviamos el correo
        await transport.sendMail({
            from: SMTP_USER,
            to: email,
            subject: subject,
            text: body,
        });
    } catch (err) {
        throw generateErrorUtil('Error al enviar el correo electrónico', 500);
    }
};

export default sendEmailUtil;
