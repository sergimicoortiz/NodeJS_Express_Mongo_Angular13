FROM node:19-alpine as install
WORKDIR /app
COPY ./package.json ./package.json
RUN ["npm", "install"]

FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY ./wait-for-it.sh ./wait-for-it.sh
COPY ./package.json ./package.json
COPY ./app ./app
COPY ./index.js ./index.js
COPY ./env_example.txt ./.env
RUN apk update && apk add bash
RUN ["chmod", "+x", "./wait-for-it.sh"]
EXPOSE 3001