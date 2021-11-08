# build environment
FROM node:14 as build
WORKDIR /app
COPY package.json ./
COPY yarn.lock* ./
#RUN npm install -g yarn
RUN yarn install
COPY . ./
RUN yarn build

# production environment
FROM nginx:stable
COPY --from=build /app/build /usr/share/nginx/html
# new
COPY etc/nginx/nginx-docker.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
