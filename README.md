<h1 align="center"><b>🤖 Disruptive Studio test back-end</b></h1>

<p align="center">
  <img src="./src/assets/logo.svg" width="200" alt="Disruptive Studio Logo" />
</p>

Resolución de la prueba técnica por parte del equipo técnico de Disruptive Studio, con el objetivo de ampliar el conocimiento sobre las capacidades del entrevistado, así como su manera de trabajar y abarcar la resolución de problemas.

## 💻 Índice

* [Arquitectura del la aplicación](#archApp)
    * [Estructura](#structure)
    * [Librerías implementadas para la realización del desarrollo del front-end](#libraries)
* [Pasos iniciales](#initApp)
* [Ejecutar la aplicación](#execApp)
* [Y mas...](#more)

<div style="height:40px; margin-top:-40px; visibility: hidden;">
  <a id="archApp"></a>
</div>

## 🚀 Arquitectura del la aplicación

La aplicación está construida en Express.js, con un scaffolding personalizado que pueden encontrar en el siguiente [repositorio](https://github.com/waldo21m/express-scaffolding).

<div style="height:40px; margin-top:-40px; visibility: hidden;">
  <a id="structure"></a>
</div>

### ⛩ Estructura
Este proyecto tiene una estructura de carpetas y convención de nombres muy bien definida y fácil de seguir, se basa en los siguientes enlaces:
* https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
* https://mr-alien.medium.com/folder-structure-for-nodejs-expressjs-project-56be9ec35548
* https://faun.pub/best-practices-for-organizing-your-express-js-project-a-guide-to-folder-structure-f990db979ee7

<div style="height:40px; margin-top:-40px; visibility: hidden;">
  <a id="libraries"></a>
</div>

### 📚 Librerías implementadas para la realización del desarrollo del front-end

Podemos destacar algunas de las librerías y configuraciones:

- [x] Typescript.
- [x] Eslint.
- [x] Prettier.
- [x] Pnpm.
- [x] Express.
- [x] Jest.
- [x] @hapi/boom.
- [x] Bcrypt.
- [x] Cors.
- [x] Dotenv.
- [x] Helmet.
- [x] Joi.
- [x] Jsonwebtoken.
- [x] Mongoose.
- [x] Morgan.
- [x] Uuid.

*Nota: Para mayor información del resto de las dependencias, no dude en consultar el archivo package.json.*

<div style="height:40px; margin-top:-40px; visibility: hidden;">
  <a id="initApp"></a>
</div>

## 🐾 Pasos iniciales

Una vez clonado el proyecto, debemos movernos a la carpeta raíz, ejecutando el siguiente comando:

```sh
cd ds-backend-test
```

Luego, necesitamos ejecutar el siguiente comando para instalar todas las librerías necesarias:

```sh
pnpm i
```

*Nota: En caso de no tener instalado pnpm, lo podemos hacer con el comando `npm add -g pnpm`.*

<div style="height:40px; margin-top:-40px; visibility: hidden;">
  <a id="execApp"></a>
</div>

## 🧪 Ejecutar la aplicación

Para iniciar la aplicación ejecutamos el siguiente comando:

```sh
pnpm run dev
```

Listado de comandos:

| Comando                | Acción                                    |
| ---------------------- | ----------------------------------------- |
| pnpm run start         | Ejecuta la app con ts-node                |
| pnpm run dev           | Ejecuta la app con nodemon                |
| pnpm run build         | Compila la app                            |
| pnpm run lint          | Analiza el código                         |
| pnpm run lint:fix      | Formatea el código                        |
| pnpm run format        | Formatea el código con prettier           |
| pnpm run test          | Ejecuta los tests                         |
| pnpm run coverage      | Ejecuta los test con informe de cobertura |

<div style="height:40px; margin-top:-40px; visibility: hidden;">
  <a id="more"></a>
</div>

## 💡 Y mas...

Por fines prácticos, las variables de entorno fueron subidas al repositorio y no son un mero accidente. Se recomienda iniciar la aplicación y ejecutar la ruta `/health` que se encarga de crear la data inicial y comprobar si el deploy fue exitoso.

Se anexa en este repositorio la colección en postman para comprobar los endpoints desarrollados y cuales son sus parámetros de entrada.

Las pruebas unitarias planteadas tiene un coverage del 100% para el user controller y ciertos archivos. Esto sirve para demostrar mis habilidades en el desarrollo de pruebas unitarias. Pero, por cuestiones de tiempo, solo se plantearon ciertas pruebas unitarias.

Los endpoints desarrollados son un MVP para esta prueba.

<br />

<p align="center">
  <img src="./src/assets/waldo-avatar.png" width="200" alt="Waldo avatar" />
  <h3 align="center">Eduardo Márquez | Ingeniero de Sistemas | Desarrollador Web </h3>
  <h4 align="center">Desarrollado con amor ❤️</h4>
</p>
