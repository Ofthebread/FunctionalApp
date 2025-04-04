
# Functional Training App 🏋️‍♂️

Functional Training App es una plataforma de entrenamiento funcional donde los usuarios pueden registrarse, iniciar sesión, consultar sus entrenamientos asignados, ver videos de ejercicios y valorar su esfuerzo (RPE). Los entrenadores (admins) pueden gestionar entrenamientos, usuarios y ejercicios.

## Dependencias

- Node.js
- Express
- MySQL
- Sequelize
- Bcrypt
- JSON Web Tokens
- Dotenv
- Multer (para subir avatares/videos)
- CORS

---

## 🚀 Instalación

1. Instalar las dependencias con el comando:
   ```bash
   npm install
   ```

2. Copiar el archivo `.env.example` y renombrarlo como `.env`. Luego completar los datos necesarios.

3. Ejecutar el siguiente comando para crear las tablas en la base de datos:
   ```bash
   npm run initdb
   ```

4. Iniciar el servidor en modo desarrollo con:
   ```bash
   npm run dev
   ```

---

## Base de datos

### users

| Campo          | Tipo         | Descripción                                  |
|----------------|--------------|----------------------------------------------|
| id             | INT UNSIGNED | Identificador único del usuario              |
| name           | VARCHAR(100) | Nombre completo                              |
| email          | VARCHAR(100) | Correo electrónico único                     |
| password       | VARCHAR(255) | Contraseña en hash                           |
| role           | ENUM         | Rol del usuario (`user`, `admin`)            |
| avatar         | VARCHAR(255) | URL del avatar (opcional)                    |
| createdAt      | DATETIME     | Fecha de creación                            |

### trainings

| Campo         | Tipo         | Descripción                                |
|---------------|--------------|--------------------------------------------|
| id            | INT UNSIGNED | ID del entrenamiento                       |
| title         | VARCHAR(100) | Título del entrenamiento                   |
| description   | TEXT         | Descripción general                        |
| createdBy     | INT UNSIGNED | ID del entrenador (admin) que lo creó      |
| createdAt     | DATETIME     | Fecha de creación                          |

### exercises

| Campo         | Tipo         | Descripción                              |
|---------------|--------------|------------------------------------------|
| id            | INT UNSIGNED | ID del ejercicio                         |
| name          | VARCHAR(100) | Nombre del ejercicio                     |
| video_url     | TEXT         | URL del video explicativo                |
| description   | TEXT         | Descripción técnica del ejercicio        |
| createdBy     | INT UNSIGNED | ID del admin que lo registró             |

### training_exercises

| Campo         | Tipo         | Descripción                              |
|---------------|--------------|------------------------------------------|
| id            | INT UNSIGNED | ID del registro                          |
| training_id   | INT UNSIGNED | FK del entrenamiento                     |
| exercise_id   | INT UNSIGNED | FK del ejercicio                         |
| sets          | VARCHAR(50)  | Series                                   |
| reps          | VARCHAR(50)  | Repeticiones                             |
| rest_time     | VARCHAR(50)  | Tiempo de descanso                       |

### user_trainings

| Campo         | Tipo         | Descripción                          |
|---------------|--------------|--------------------------------------|
| id            | INT UNSIGNED | ID del registro                      |
| user_id       | INT UNSIGNED | Usuario asignado                     |
| training_id   | INT UNSIGNED | Entrenamiento asignado               |
| assigned_at   | DATETIME     | Fecha de asignación                  |

### ratings

| Campo         | Tipo         | Descripción                              |
|---------------|--------------|------------------------------------------|
| id            | INT UNSIGNED | ID del comentario/valoración             |
| user_id       | INT UNSIGNED | ID del usuario que valora                |
| training_id   | INT UNSIGNED | ID del entrenamiento valorado            |
| rpe           | TINYINT      | Valoración RPE del 1 al 10               |
| comment       | TEXT         | Comentario sobre la sesión               |
| created_at    | DATETIME     | Fecha de valoración                      |

---

## Endpoints del usuario

- **POST** - [`/api/users/register`] - Crea un nuevo usuario.
- **POST** - [`/api/users/login`] - Inicia sesión.
- **POST** - [`/api/users/password`] - Cambia contraseña autenticado.
- **PUT** - [`/api/users/password/reset`] - Solicita recuperación de contraseña.
- **PUT** - [`/api/users/password/reset/:code`] - Restaura contraseña con código.
- **GET** - [`/api/users/profile`] - Obtiene el perfil.
- **PUT** - [`/api/users/profile`] - Edita perfil.
- **PUT** - [`/api/users/avatar`] - Sube o cambia avatar.
- **GET** - [`/api/users/trainings`] - Ver entrenamientos asignados.
- **POST** - [`/api/trainings/:id/rating`] - Valorar entrenamiento (comentario + RPE).

## Endpoints de entrenamientos

- **GET** - [`/api/trainings`] - Listar todos los entrenamientos (admin).
- **GET** - [`/api/trainings/:id`] - Ver detalle de un entrenamiento.
- **POST** - [`/api/trainings`] - Crear entrenamiento (admin).
- **PUT** - [`/api/trainings/:id`] - Editar entrenamiento (admin).
- **DELETE** - [`/api/trainings/:id`] - Eliminar entrenamiento (admin).
- **POST** - [`/api/trainings/:id/assign/:userId`] - Asignar entrenamiento a usuario (admin).
- **GET** - [`/api/trainings/:id/ratings`] - Ver valoraciones (admin).

## Endpoints de ejercicios

- **GET** - [`/api/exercises`] - Listar todos los ejercicios.
- **GET** - [`/api/exercises/:id`] - Ver ejercicio específico.
- **POST** - [`/api/exercises`] - Crear ejercicio (admin).
- **PUT** - [`/api/exercises/:id`] - Editar ejercicio (admin).
- **DELETE** - [`/api/exercises/:id`] - Eliminar ejercicio (admin).

## Endpoints de administración

- **GET** - [`/api/admin/users`] - Lista todos los usuarios (admin).
- **PATCH** - [`/api/admin/users/:id/:active`] - Activar / desactivar usuario (admin).
- **PUT** - [`/api/admin/users/:id/role`] - Cambiar rol de usuario (admin).
- **DELETE** - [`/api/admin/users/:id`] - Eliminar usuario (admin).

---

Este proyecto está desarrollado en **Node.js con Express** y utiliza **MySQL** como base de datos. 🚀
