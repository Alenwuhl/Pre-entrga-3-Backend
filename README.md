# Tercera Pre Entrega Curso Backend

Este proyecto es una aplicación web de ecommerce diseñada como parte de una serie de entregas para un curso de desarrollo backend.
La aplicación permite a los usuarios registrarse, iniciar sesión, y navegar a través del catálogo de productos.
Los usuarios con permisos de administrador tendrán acceso a funcionalidades adicionales.

## Comenzando

Para comenzar a utilizar la aplicación, necesitarás registrarte e iniciar sesión siguiendo las instrucciones a continuación. 
La aplicación está diseñada para ser intuitiva y fácil de usar, proporcionando acceso seguro y personalizado a cada usuario.

### Instalación y Registro

Para registrarte en la aplicación, sigue estos pasos:

1. Navega al endpoint `/api/users/register` desde herramienta de API como Postman.
2. Proporciona tus datos personales en el cuerpo de la solicitud, incluyendo `first_name`, `last_name`, `email`, `age`, y `password`.
3. Si deseas registrarte con permisos de administrador, asegúrate de incluir el rol de `"admin"` en tus datos de registro.

Una vez registrado, puedes iniciar sesión siguiendo estos pasos:

1. Dirígete al endpoint `/api/users/login`.
2. Ingresa tu `email` y `password` registrados.
3. Al iniciar sesión correctamente, tu sesión quedará abierta por un tiempo limitado, durante el cual podrás usar todas las funcionalidades de la aplicación.

## Uso

Una vez iniciada la sesión, podrás navegar a través del catálogo de productos, realizar compras, y, si estás registrado como administrador, acceder a endpoints específicos para la gestión de la aplicación.

## Despliegue

Este proyecto se puede desplegar en servidores locales hasta el momento.

## Construido con

- Node.js - Entorno de ejecución para JavaScript
- Express - Framework para aplicaciones web
- MongoDB - Sistema de base de datos

## Autores

- **Alen Wuhl**
