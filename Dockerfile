FROM node:latest

WORKDIR /api

COPY package.json .

RUN npm install
COPY . .
EXPOSE 3000

RUN npx prisma generate
CMD ["npm", "start"]