¿Qué es esto?
Aplicación backend básica de biblioteca virtual. Los usuarios se podrán crear una cuenta, y logeandose en la misma, podrán cargar nuevos libros, activarlos o desactivarlos. Y también podrán eliminarlos, o modificarlos. 

Se usa una conexión a openlibrary.org para tener un endpoint que será el "oráculo de lectura", que se trata de un endpoint que de manera random hará una recomendación de lectura, con los datos principales del libro que se recomiende. 

Por otro lado, para evaluar el uso de cada endpoint hay un middleware que va guardando cada consulta realizada. 

Instalación:
Para realizar la instalación, es necesario tener Node.js instalado, y luego ejecutar el comando en consola "npm install".

Inicio:
Una vez que se realiza la instalación de los módulos necesarios, se debe ejecutar el comando "npm start" para iniciar el servidor. Por consola se mostrarán los mensajes correspondientes, indicando el inicio en el puerto 8080, y el enlace para los endpoints. 

