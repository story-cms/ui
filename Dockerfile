ARG NODE_IMAGE=node:19.2.0-alpine
ARG VITE_CLOUDINARY_API_KEY

FROM $NODE_IMAGE as build
ENV VITE_CLOUDINARY_API_KEY=$VITE_CLOUDINARY_API_KEY
WORKDIR /app
COPY package.json .
RUN npm install
RUN echo "------"
RUN echo $VITE_CLOUDINARY_API_KEY
RUN echo "------"
COPY . .
RUN npm run build

FROM nginx:1.23.2 as server
COPY ./ops/nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/.histoire/dist /usr/share/nginx/html
