FROM node:20

WORKDIR /app/apps/discord-gateway

COPY apps/discord-gateway/package*.json ./

RUN npm install --omit=dev

COPY apps/discord-gateway ./

CMD ["node","src/bot.js"]
