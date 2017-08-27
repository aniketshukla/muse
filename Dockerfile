FROM node:6
WORKDIR /app
COPY . /app
RUN npm install --save 
EXPOSE 3000
CMD node index.js
