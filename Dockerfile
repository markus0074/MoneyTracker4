FROM node:12-buster

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --if-present

CMD ["npm run start"]
