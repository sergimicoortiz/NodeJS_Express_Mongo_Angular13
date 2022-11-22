#Instalamos las dependencias en una primera stage
FROM node:19-alpine as install
WORKDIR /app
COPY ./package.json ./package.json
RUN ["npm", "install"]

#Copiamos las dependencias de la anterior stage
FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
#Copiamos el proyecto a la imagen 
#excluyendo los ficheros que hemos especificado anteriormente en el fichero .dockerignore
COPY . .
EXPOSE 4200
#Arrancamos el servicio
CMD ["npm", "run", "start"]