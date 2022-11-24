# Instalamos las dependencias en una primera stage.
FROM node:19-alpine as install
WORKDIR /app
COPY ./package.json ./package.json
RUN ["npm", "install"]
# Copiamos las dependencias de la anterior stage.
FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
# Copiamos wait-for-it.sh al cual se le da permisos de edición posteriormente.
COPY ./wait-for-it.sh ./wait-for-it.sh
COPY ./package.json ./package.json
COPY ./app ./app
COPY ./index.js ./index.js
# Copiamos las variables de entorno que utiliza el servidor.
COPY ./env_example.txt ./.env
# Añadimos bash el cual es necesario para ejecutar wait-for-it.sh
RUN apk update && apk add bash
RUN ["chmod", "+x", "./wait-for-it.sh"]
EXPOSE 3001