FROM node:20

WORKDIR /app

COPY Intro3/apps/discord-gateway/package*.json ./

RUN npm install --omit=dev

COPY Intro3/apps/discord-gateway ./

CMD ["node","src/bot.js"]
