# Dockerfile

FROM node:13-alpine

EXPOSE 3000

WORKDIR /data

ENTRYPOINT ["/bin/sh", "/data/entrypoint.sh"]

COPY target/entrypoint.sh /data/entrypoint.sh

ADD . /data
