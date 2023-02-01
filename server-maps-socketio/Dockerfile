FROM node:alpine

RUN yarn global add nodemon 

WORKDIR /app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 4000

CMD ["nodemon", "index.js"]

