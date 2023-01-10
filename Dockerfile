FROM node:19.2.0-alpine as build
ARG VITE_CLOUDINARY_API_KEY
ENV VITE_CLOUDINARY_API_KEY=$VITE_CLOUDINARY_API_KEY

WORKDIR /app
COPY package*.json ./
# RUN npm install
COPY . .
RUN npm run some
RUN npm run build

FROM nginx:1.23.2 as server
COPY ./ops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/.histoire/dist /usr/share/nginx/html