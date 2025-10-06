FROM node:20.19.5-bullseye AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ ./
ENV NODE_ENV=production
RUN npm run build

FROM nginx:stable-alpine3.21-perl AS production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/sdv-klavir/browser /app
# COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]