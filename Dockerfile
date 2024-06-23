FROM node:18-alpine

WORKDIR /usr/src/kidshift

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "start"]

EXPOSE 3000
