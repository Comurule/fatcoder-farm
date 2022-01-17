# Dockerfile
FROM node:14
# Or whatever Node version/image you want
WORKDIR '/var/www/app'
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8081
CMD ["node","www/server.js"]