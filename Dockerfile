# Dockerfile

FROM node:9

MAINTAINER me@nalbam.com

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 3000

COPY server.js .

CMD ["node", "server.js"]
