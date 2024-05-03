FROM node:20-alpine

WORKDIR /md-blog-gen
COPY package.json .
RUN npm install
COPY . .

EXPOSE 3000

RUN chmod +x scripts/start.sh

CMD ["scripts/start.sh"]
