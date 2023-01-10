ARG NODE_IMAGE=node:19.2.0-alpine
ARG VITE_CLOUDINARY_API_KEY
ARG VITE_CLOUDINARY_SECRET

FROM $NODE_IMAGE as build

WORKDIR /app
COPY package*.json ./
ENV VITE_CLOUDINARY_API_KEY=$VITE_CLOUDINARY_API_KEY
ENV VITE_CLOUDINARY_SECRET=$VITE_CLOUDINARY_SECRET
RUN echo $VITE_CLOUDINARY_API_KEY
RUN npm install
COPY . .
RUN npm run build

FROM nginx:1.23.2 as server
COPY ./ops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/.histoire/dist /usr/share/nginx/html