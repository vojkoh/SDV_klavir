FROM node:20.17.0-bullseye@sha256:2e4f9bafd163646c7d8f03fc0b21bd984a7a87db69b3d6c7ef235add2216bbaf AS build
WORKDIR /usr/src/app
COPY ./backend/package*.json ./
RUN npm install
COPY ./backend .
RUN npm run build

FROM node:20.17.0-bullseye@sha256:2e4f9bafd163646c7d8f03fc0b21bd984a7a87db69b3d6c7ef235add2216bbaf
WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist .
COPY ./backend/package*.json ./
RUN npm install --omit=dev
# ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "src/index.js"]