FROM node:19-alpine as install
WORKDIR /app
COPY ./package.json ./package.json
RUN ["npm", "install"]

FROM node:19-alpine
WORKDIR /app
COPY --from=install /app/node_modules ./node_modules
COPY . .
EXPOSE 4200
CMD ["npm", "run", "start"]