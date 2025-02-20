FROM node:23-alpine

WORKDIR /src

COPY . .

CMD npm run init-linux

# RUN npm install

