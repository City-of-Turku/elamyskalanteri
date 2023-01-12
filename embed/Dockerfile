FROM node:16-bullseye-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 8001
USER node
CMD ["node", "serve.js"]