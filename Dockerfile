FROM node:14.15-alpine AS development
WORKDIR /app/
COPY ./package*.json /app/
RUN apk add --no-cache make python g++ && npm install
CMD npm run dev

FROM node:14.15-alpine AS production
WORKDIR /app/
COPY ./package*.json /app/
RUN apk add --no-cache make python g++ && npm install --production
COPY ./src /app/src
CMD npm start
