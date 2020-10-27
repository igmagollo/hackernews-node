FROM node:12.18.3

WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./

RUN yarn install
COPY . .
EXPOSE 4000
CMD ["node", "src/index.js"]
