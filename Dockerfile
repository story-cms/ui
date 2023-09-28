FROM node:19.2.0-alpine as build
ARG VITE_CLOUDINARY_API_KEY
ARG VITE_CLOUDINARY_SECRET
ARG VITE_BIBLE_API_KEY
ARG DO_OAUTH_TOKEN

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:1.23.2 as server
COPY ./ops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/.histoire/dist /usr/share/nginx/html