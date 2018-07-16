# Dockerfile

FROM node:latest

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

COPY src /data

WORKDIR data

RUN npm install -s

CMD ["node", "server.js"]
