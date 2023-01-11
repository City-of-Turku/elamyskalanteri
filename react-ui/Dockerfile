FROM node:16-bullseye-slim

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
USER node
CMD ["npm", "start"]