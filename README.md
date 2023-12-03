# Configuración del Entorno de Desarrollo para Laravel y React

Taller N°2 asignatura Introducción al desarrollo web/movil.

Este repositorio contiene un proyecto desarrollado con Laravel para el backend y React en el frontend. Sigue los pasos a continuación para configurar el entorno de desarrollo en tu computadora.

[![Image from Gyazo](https://i.gyazo.com/d1a1b3c4791259b9e44671a5d9779a83.gif)](https://gyazo.com/d1a1b3c4791259b9e44671a5d9779a83)

## 1. Entorno de trabajo

- [Git 2.38.1 o superior.](https://git-scm.com/)
- [Xampp 8.2.12 (**opcional**, se puede utilizar otra base de datos MySQL)](https://www.apachefriends.org/es/index.html)
- [Composer 2.5.8 o superior](https://getcomposer.org/)
- [Node.js  18.12.1 o superior](https://nodejs.org/en)
- Se requiere crear una base de datos MySQL

Observación: Se utilizo Xampp como base de datos, este ya trae PHP,
en caso de requerirlo se debe tener PHP 8.2.4 o superior

## 2. Empezando

- Clonar el repositorio a trabajar

```bash
git clone https://github.com/skeret2/Practica-2-DWM.git
```

## 3. Configuración de base de datos

Se debe copiar el contenido de **.env.example** para insertarlo en un archivo **.env** que debes crear

```bash
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=nombre_base_datos
DB_USERNAME=root
DB_PASSWORD=
```

*Los datos anteriores se deben editar según las credenciales de la base de datos creada anteriormente.*

## 4. Dependencias de Laravel

Ejecutar los siguientes comandos que se presentan a continuación dentro de la carpeta Backend-Laravel

```bash
cd Backend-Laravel #nos posicionamos en la raiz del backend
composer install
php artisan key:generate #genera la clave de aplicación
```

## 5. JWT
Se utilizo Json web token **(JWT)** para esto se requiere crear una clave secreta

```bash
php artisan jwt:secret #genera la key JWT
```

## 6. Migraciones en laravel

```bash
php artisan migrate
```

## 7. Ejecutar los seeders
```bash
php artisan db:seed
```

## 8. Levantar Laravel
```bash
php artisan serve
```

## 9. Dependencias de React

Ejecutar los siguientes comandos dentro de la carpeta frontend-react
```bash
cd frontend-react #nos posicionamos en la raiz del frontend
npm install
```

## 10. Levantar React

```bash
npm start
```

## Error de conflinco CSRF y JWT
Laravel posee CSRF como seguridad y por esto genera conflicto ya que al usar JWT no es necesario utilizarlo, para solucionar el error si lo posees debes añadir es codigo en el archivo:
- app/Http/Middleware/VerifyCsrfToken.php
```bash
protected $except =[
    'api/*', # esto hace que se quite el conflicto, se excluyen las rutas de la api
];
```
## Uso
- Para entrar al frontend
http://localhost:3000/

