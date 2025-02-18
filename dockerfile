FROM node:23-alpine

WORKDIR /src

COPY . .

RUN cd cmd && ./init.sh
