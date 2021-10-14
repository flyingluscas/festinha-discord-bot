FROM node:14.15-alpine AS development
WORKDIR /app/
COPY ./package*.json /app/
RUN npm install
CMD npm run dev

FROM node:14.15-alpine AS production
WORKDIR /app/
COPY ./src /app/src
COPY ./package*.json /app/
RUN npm install --production
CMD npm start
