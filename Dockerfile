# Dockerfile

FROM node:latest

MAINTAINER me@nalbam.com

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

WORKDIR data

COPY src/main/node/server.js .
COPY src/main/node/package.json .

RUN npm install && pwd && ls -al

CMD ["node", "server.js"]
