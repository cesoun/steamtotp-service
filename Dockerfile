FROM node:lts
WORKDIR .

copy package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn install --production

CMD ["node", "index.js"]
