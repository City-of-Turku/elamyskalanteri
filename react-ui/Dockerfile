FROM node:16-bullseye-slim

WORKDIR /app
COPY package.json package-lock.json ./
COPY . .
RUN npm ci
RUN npm install -g serve@14
RUN npm run build
RUN chmod +x create_mainjs_copy.sh
RUN ./create_mainjs_copy.sh
EXPOSE 3000
USER node
CMD ["serve", "-s", "build", "-l", "3000"]