FROM node:20.19.5-bullseye AS build
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.19.5-bullseye
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist .
COPY ./package*.json ./
RUN npm install --omit=dev
# ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]