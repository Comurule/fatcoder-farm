# Dockerfile
FROM node:14
# Or whatever Node version/image you want
WORKDIR '/var/www/app'
COPY package.json .
RUN npm install
COPY . .
ENV NODE_ENV=production
EXPOSE ${PORT}
CMD [ "npm","run", "start:prod" ]