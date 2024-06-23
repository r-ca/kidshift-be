# Build
FROM node:18-alpine as build

WORKDIR /usr/src/kidshift

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/
RUN npx prisma generate

COPY . . 

RUN npm run build

# Runtime
FROM node:18-alpine as runtime
WORKDIR /usr/src/kidshift

COPY package-lock.json .
COPY package.json .

COPY --from=build /usr/src/kidshift/dist ./dist
COPY --from=build /usr/src/kidshift/node_modules ./node_modules
COPY --from=build /usr/src/kidshift/prisma ./prisma
COPY --from=build /usr/src/kidshift/src ./src
COPY --from=build /usr/src/kidshift/static ./static


# CMD ["npm", "start"]

# cat package.json to debug
# CMD ["pwd"]
CMD ["ls", "-la"]

EXPOSE 3000
