FROM node:alpine

WORKDIR /app

COPY package.json .

RUN yarn

EXPOSE 5173

CMD [ "yarn", "dev" ]