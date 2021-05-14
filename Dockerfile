FROM node:lts-buster

WORKDIR /app
COPY ./dist/ .
COPY package.json .

ENV NODE_ENV=production
RUN yarn install --frozen-lockfile --production

EXPOSE 5000

CMD ["node", "server.js"]