ARG NODE_IMAGE=node:19.2.0-alpine

FROM $NODE_IMAGE as build
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/.histoire/dist /usr/share/nginx/html
