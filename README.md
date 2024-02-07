# INVENTARIO DE PRODUCTOS 
## Ejecución del Sistema de Inventario
Este repositorio contiene un sistema de inventario desarrollado en React, con el backend configurado en Supabase . A continuación, se detallan los pasos necesarios para configurar y ejecutar el programa.

Requisitos Previos:
Node.js y npm instalados en tu sistema.
Credenciales de Supabase para la configuración del backend.
## Pasos para Ejecutar el Programa:
### Clonar el Repositorio:
```
git clone <URL_DEL_REPOSITORIO>
cd nombre-del-repositorio
```
### Instalar Dependencias:
```
npm install
```
## Configuración del Backend:


Configura la autenticación y la base de datos según la elección realizada, para la base de datos se utilizo SUPABASE.
## ¿Qué es SUPABASE?
Supabase es una plataforma BaaS (Backend as a Service) alojada en la nube que provee a los desarrolladores una amplia gama de herramientas para crear y gestionar servicios backend. 
Esto permite subcontratar funciones y desarrollar las aplicaciones de manera ágil, sin tener que preocuparse por las tareas relacionadas con el lado del servidor.

## Replicamiento 
- Crea una cuenta en Supabase https://supabase.com y configura un nuevo proyecto.
- Configura la autenticación OAuth en Supabase para permitir el inicio de sesión con proveedores como GitHub, Google, Facebook, etc (Opcional).
- Configura una nueva base de datos en Supabase para almacenar los mensajes del chat. 

- Crea un archivo .env en la raíz del proyecto y agrega las siguientes variables de entorno:
```
VITE_SUPABASE_URL=URL_de_tu_proyecto_de_Supabase
VITE_SUPABASE_ANON_KEY=Clave_anónima_de_tu_proyecto_de_Supabase
```

## Ejecuta la aplicación localmente:
```
npm run dev
```
Abre tu navegador web y visita (http://localhost:5173/) para ver la aplicación en funcionamiento.
## Notas Adicionales:
Asegúrate de que el backend esté correctamente configurado y en ejecución antes de utilizar la aplicación.
Si necesitas ayuda adicional con la configuración o tienes alguna pregunta, consulta la documentación de Supabase o Firebase o comunícate con el equipo de desarrollo.
