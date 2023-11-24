# Configuración del Entorno de Desarrollo para Laravel y React

Taller N°2 asignatura Introduccón web/movil
Este repositorio contiene un proyecto desarrollado con Laravel para el backend y React en el frontend. Sigue los pasos a continuación para configurar el entorno de desarrollo en tu computadora.

## Entorno de ejecución
    Debe tener instalado Node.js
    Debe tener instalado Composer
    Se requiere una base de datos

## Crear una base de datos en Mysql
Luego de su creacion se deben ejecutar los siguientes comandos:
```bash
git clone https://github.com/skeret2/Practica-2-DWM.git
copy .env.example  en .env
```

## Dependencias de Laravel
Ejecutar lo comandos que se presentan a continuación dentro de la carpeta Backend-Laravel
```bash
cd Backend-Laravel
composer install
php artisan key:generate
```

#### Migraciones en laravel
```bash
php artisan migrate
```
#### Ejecutar los seeders
```bash
php artisan db:seed
```
#### JWT
Se utilizo Json web token para esto se requiere instalar
```bash
composer require tymon/jwt-auth
php artisan jwt:secret //genera la key
```

#### Levantar Laravel
```bash
php artisan serve
```

## Dependencias de React
Ejecutar los siguientes comandos dentro de la carpeta frontend-react
```bash
cd frontend-react
npm install
```
#### Librerias utilizadas
```bash
npm install react-bootstrap bootstrap
npm install axios
npm install react-router-dom
```
#### Levantar React
```bash
npm start
```
