FROM node:18

WORKDIR /rm2-ui/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
RUN npm install http-server -g
EXPOSE 8080

CMD ["http-server", "build"]
