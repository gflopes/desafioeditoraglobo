FROM node:13.12.0-alpine
RUN mkdir -p backend & chmod -R node:node /backend
WORKDIR /backend
COPY package*.json /backend/
RUN npm install
COPY . .
COPY --chown=node:node . .
USER node
EXPOSE 3000
CMD ["node", "loader.js"]