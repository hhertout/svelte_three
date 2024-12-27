FROM node:22-alpine3.21

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

CMD ["npm", "run", "dev"]