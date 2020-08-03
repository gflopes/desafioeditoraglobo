FROM node:13.12.0-alpine
WORKDIR /frontend
COPY package*.json /frontend/
RUN npm install
COPY . /frontend/
EXPOSE 3000
CMD ["npm", "start"]