# NodeJS_Express_Mongo_Angular12

Por [`Sergi Micó Ortiz`](https://github.com/sergimicoortiz)  y  [`Juan Luis López del Barco`](https://github.com/JuanLuisLopez-code)

## Table of Contents

1. WalapopAcendado
2. Instalar
3. Tecnologias


# WalapopAcendado! 
_Bienvenidas y bienvenidos a WalapopAcendado_

1. **Home:**
   Carousel e infiniteScroll de las categorias más populares

2. **Shop:**
   Obtención de productos, filtros, paginación, añadir a favorito, usuarios añadidos en cada producto para redirección

3. **Details:**
   Ver detalles junto a un Carousel del propio producto, añadir a favoritos y comentar el producto.
   Además permite visitar el perfil del vendedor.

4. **Profile:**
   Ver el perfil de cualquier usuario, seguirlo. Si eres ese usuario podras ver tus productos y tus likes.

5. **Login:**
   Register y Login de usuario.

## Instalar 💿

---

### `Requisitos`
Es necesario crear el fichero .env en la carpeta backend. El contenido puede ser el mismo que el de env_example.txt

Tener instalado las siguientes herramientas:

- [NodeJS](https://nodejs.org/en/download/) v16.17.0
- [Angular](https://angularjs.org) v13
- [MongoDB](https://www.mongodb.com/try/download/community)

### `Puesta en marcha`

#### Backend
  ```
  cd backend
  npm install
  npm run start
  ```

  #### Frontend
  ```
  cd frontend
  npm install
  npm run start
  ```

## Tecnologías 👨‍💻

---

Lista de tecnologías utilizadas en este proyecto:

`Backend` 🏗️

- [ExpressJs](https://expressjs.com/): V4.18.1
  - NodeJS
  - Javascript
  - Routes
  - Models
  - Controllers
  - DB validation
  - Mongoose
    - Relationships
    - Schema
  - Middleware_auth
    - Header
    - Token JWT
  - Dummys: users y products


`Frontend` 🏛️

- [Angular](https://angularjs.org): V13
  - TypeScript
  - Estructurado en Modules, Shared y Core
  - Routes
  - Models
  - Components
  - Reactive Forms
    - Validation
  - Lazy load
  - Angular Authentication
    - Guards
    - Interceptor
    - Services
    - Authentication JWT enviado por Headers
  - Sucriptions y Observables
  - RxJS Subjects
  - Toastr
  

`BBDD`💾

- [MongoDB](https://www.mongodb.com/)
